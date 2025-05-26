#from langchain_commnity.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
from sentence_transformers import SentenceTransformer
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.document_loaders import PyPDFLoader
from langchain import HuggingFacePipeline, PromptTemplate,LLMChain
from langchain.memory.buffer import ConversationBufferMemory
from langchain.schema.runnable import RunnablePassthrough
from langchain_core.output_parsers import StrOutputParser
from huggingface_hub import login
import faiss
from langchain.vectorstores import FAISS


# Use your token to log in

# Uncomment the line below to log in to Hugging Face

#->   login(token='token')

# #add hugging face tokeen

from langchain_huggingface import HuggingFaceEmbeddings




loader = PyPDFLoader("/content/Chatbot dataset.pdf")

doc = loader.load_and_split()



from transformers import AutoTokenizer, AutoModelForCausalLM
from transformers import pipeline
import torch

class CustomOutputParser(StrOutputParser):
    def parse(self, response: str):
        # Extract only the main answer from the response
        if "[INST]" in response:
            response = response.split("[INST]")[-1]
        
        # Attempt to directly extract answer text
        answer_start = response.find("Anatomy of Lungs:")
        if answer_start != -1:
            return response[answer_start:].strip()
        
        # If "Anatomy of Lungs:" is not found, try extracting any clear answer
        answer_lines = response.split("\n")
        filtered_lines = [line.strip() for line in answer_lines if line.strip() and not line.startswith("<<SYS>>")]
        clean_response = "\n".join(filtered_lines).strip()
        
        return clean_response if clean_response else "The requested information is not available in the provided content."


class LLMRAGModel:
    def __init__(self, llm_name="google/gemma-2b-it", retriever_name="sentence-transformers/all-MiniLM-L6-v2"):

        self.tokenizer = AutoTokenizer.from_pretrained("google/gemma-2b-it")
        self.model = AutoModelForCausalLM.from_pretrained("google/gemma-2b-it", device_map="auto", torch_dtype=torch.float16)
        
        self.llmPipeline = pipeline(
            "text-generation",
            model=self.model,
            tokenizer=self.tokenizer,
            torch_dtype=torch.float16,
            device_map="auto",
            max_new_tokens=500,  # Increase response length
            max_length=800,      # Total length (prompt + response)
            do_sample=True,
            top_k=50,            # Higher diversity
            num_return_sequences=1,
            eos_token_id=self.tokenizer.eos_token_id
        )
        
        self.llm = HuggingFacePipeline(pipeline = self.llmPipeline, model_kwargs = {'temperature':0.7,'max_length': 5, 'top_k' :50})
    
    def getPromptFromTemplate(self):
        system_prompt="""Analyze the user's query to understand the specific information they are seeking.
Retrieve relevant contents from the provided  anatomy of lungs that match the user's query.
Generate a coherent and concise response based on the retrieved information.
If multiple responses are relevant, summarize the key points from each response.
If no relevant information is found in the provided content, respond with:
"The requested information is not available in the provided content of the Anatomy of Lungs."""
        
        instruction = """
        Context: {context} 
        User: {question}
        Answer clearly and directly without adding any extra text.
        """
        
        B_INST , E_INST = "[INST]","[/INST]"
        B_SYS,E_SYS="<<SYS>>\n", "\n<<SYS>>\n\n"
        system_prompt1 = B_SYS + system_prompt + E_SYS
        prompt_template = B_INST + system_prompt1 + instruction + E_INST
        
        prompt = PromptTemplate(input_variables=["history","question","context"], template=prompt_template)
        return prompt
    
    def buildRetrieval(self, model_name="sentence-transformers/all-MiniLM-L6-v2", text_files = doc):
        embeddings = HuggingFaceEmbeddings(model_name=model_name)
    
        text_splitter = CharacterTextSplitter(chunk_size=1024, chunk_overlap=128, separator=".")
        texts = text_splitter.split_documents(doc)
        db = FAISS.from_documents(texts, embeddings)
    
        retriever = db.as_retriever()
        return retriever
    
    # can create new chain for each user
    def getnewChain(self):
        prompt = self.getPromptFromTemplate()  # Get a prompt template for the user
        memory = ConversationBufferMemory(input_key="question", memory_key="history", max_len=5)  # Initialize conversation memory
        retriever = self.buildRetrieval()  # Build the retriever using the specified method
        llm_chain = LLMChain(prompt=prompt, llm=self.llm, memory=memory, verbose=True, output_parser=CustomOutputParser())  # Create an LLM chain
        parser = StrOutputParser()  # Initialize a string output parser
        rag_chain = ({  # Define the RAG (Retrieval-Augmented Generation) chain
            "context": retriever, 
            "question": RunnablePassthrough()} | llm_chain
        )
        return rag_chain, retriever  # Return the RAG chain and retriever
    
    
    
model=LLMRAGModel()
