
from pyngrok import ngrok
ngrok.set_auth_token("2skqfRgBch9r3ZSWHcFhWeuBYlv_4iQWCGuJRwW31S6YcMbA1")


from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from LLMRAGModel import model
import torch
import gc
import nest_asyncio
from pyngrok import ngrok
import uvicorn
from fastapi.middleware.cors import CORSMiddleware

# Initialize FastAPI app
app = FastAPI()
origins = [
    "http://localhost:5173"  # Your Vite dev server
     # Optional if frontend is deployed
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # or ["*"] to allow all origins (for dev only)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class QueryRequest(BaseModel):
    query: str

@app.post("/query")
async def query_llm(request: QueryRequest):
    try:
        llm_chain, _ = model.getnewChain()
        response = llm_chain.invoke(request.query)
        torch.cuda.empty_cache()
        gc.collect()

        # Extract clean response
        raw_response = response['text']
        clean_response = "\n".join([line.strip() for line in raw_response.split("\n")
        if line.strip() and not line.startswith("<<SYS>>") and "Context:" not in line])

        return {"response": clean_response if clean_response else "No relevant information found."}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/")
def root():
    return {"message": "LLM RAG Chatbot API is running"}

# Run FastAPI using Uvicorn and Ngrok
nest_asyncio.apply()
public_url = ngrok.connect(8000)
print(f"Public URL: {public_url}")

uvicorn.run(app, host="0.0.0.0", port=8000)
