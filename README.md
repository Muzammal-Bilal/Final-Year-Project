# 🎉 DiagnoSense – AI-Powered Lung Cancer Detection & Awareness Platform 🧠🩺

![React](https://img.shields.io/badge/Frontend-React.js-61DAFB?logo=react)
![FastAPI](https://img.shields.io/badge/Backend-FastAPI-009688?logo=fastapi)
![Express](https://img.shields.io/badge/API-Express.js-000000?logo=express)
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)
![Python](https://img.shields.io/badge/AI-Python-3776AB?logo=python)

> ✅ Final Year Project | 🏥 Healthcare + 🧠 Artificial Intelligence

## 👥 Team

- 👨‍💻 [Muzammal Bilal](https://github.com/MuzammalBilal)
- 👨‍💻 [Muhammad Yasin](https://github.com/MuhammadYasinSaleem)
- 👨‍💻 [Shahzaib Khalid](https://github.com/M-Shahzaib-Khalid)


## 🚀 Overview

**DiagnoSense** is a full-stack, AI-powered web platform for **early lung cancer detection** and **awareness building**. It leverages cutting-edge **deep learning models** and **natural language processing** to assist users in understanding their lung health through:

- 📸 **CT scan analysis** using a hybrid **CNN + Vision Transformer (ViT)** model with attention
- 🤖 A smart **RAG-based Chatbot** for lung-related queries and awareness
- 📊 An intuitive **dashboard** for predictions and history
- 🔐 Secure **JWT-based authentication system**

---

## 🧠 AI & ML Capabilities

- 🔍 **CNN + ViT Hybrid Model**: Combines convolutional layers and attention-based transformers to analyze CT scans with high accuracy.
- 💬 **RAG-based Chatbot**: Retrieval-Augmented Generation chatbot providing verified responses to lung cancer-related questions.

---

## 🛠️ Tech Stack

| Layer         | Technologies Used                                              |
| ------------- | -------------------------------------------------------------- |
| **Frontend**  | React.js ⚛️, Redux Toolkit, Tailwind CSS                       |
| **Backend**   | FastAPI ⚡, Express.js 🚀                                       |
| **Database**  | MongoDB 🍃                                                     |
| **AI Model**  | Python 🐍, PyTorch 🧠, OpenCV, Transformers 🔎                 |
| **Chatbot**   | RAG (Retrieval-Augmented Generation), LangChain 🧠, FastAPI 🤖 |
| **Auth**      | JWT 🔐                                                         |
| **Dev Tools** | GitHub 🐙, VS Code, Postman, Docker (Optional)                 |


---

## 🧩 Features

- ✅ CT scan image upload and lung cancer prediction
- 📈 History dashboard with past prediction records
- 🤖 Chatbot for lung cancer FAQs and awareness tips
- 🔒 JWT-secured login and registration
- 🌐 Cross-platform responsive design

---


## 🖼️ Project Screenshots

### 🏠 Home Page
![Home Page](/home.png)

### 📊 Interactive Dashboard
![Dashboard](/profile.png)

### 🔍 Lung Cancer Prediction – CT Scan Upload
![Image Upload Section](/AI_Doctor.png)
![CT Scan Prediction](/result.png)

### 🔍 CT Scan Report
![Report Generated](/report.png)

### 🤖 RAG-based Chatbot
![Chatbot](/chatbot.png)


## 📦 Installation & Setup

### 📁 Clone the Repository

```bash
git clone https://github.com/Muzammal-Bilal/Final-Year-Project.git
cd Final-Year-Project
```

## 🧪 Backend (Express)

### 🚀 Navigate to Backend

```bash
cd Backend
npm install
node --watch server.js
```
### 🔐 Create .env File

Create a file named config.env in /Backend/config/ and add:

PORT= your_port_no

MONGO_URI= your_mongodb_connection_string

FRONTEND_URL= your_url

JWT_SECRET_KEY= your_secret_key

JWT_EXPIRES=

COOKIE_EXPIRE=


## 💻 Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

## 🧪 Backend Setup (Fastapi Model)

```bash
cd lung_cancer_api
pip install -r requirements.txt
uvicorn app.main:app --reload
```