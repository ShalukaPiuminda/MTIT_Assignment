# 🛒 E-Commerce Microservices Backend (MTIT Assignment)

## 📌 Project Overview
This project is a **microservice-based e-commerce backend system** developed for the MTIT Assignment.  
It demonstrates how a real-world application can be divided into independent services using an API Gateway.

The system includes multiple microservices, each responsible for a specific business function, improving scalability, maintainability, and clarity.

---

## 🧠 Business Domain
**E-Commerce / Shopping Cart System**

### Why this domain?
- Real-world relevance  
- Supports multiple independent services  
- Matches microservice architecture design  
- Suitable for team-based development  

---

## 🏗️ System Architecture

### 🔹 Architecture Type
Microservices Architecture with API Gateway

### 🔄 Request Flow
1. Client sends request  
2. API Gateway (Port 3000) receives request  
3. Gateway routes to correct microservice  
4. Microservice processes request  
5. Data stored/retrieved from MongoDB  
6. Response returned to client via Gateway  

---

## 📡 Services & Ports

| Service           | Responsibility              | Port |
|------------------|----------------------------|------|
| API Gateway      | Request routing            | 3000 |
| Product Service  | Manage products            | 5001 |
| Customer Service | Manage customers           | 5002 |
| Inventory Service| Manage stock               | 5003 |
| Order Service    | Manage orders              | 5004 |

---

## ⚙️ Tech Stack

### Backend
- Node.js
- TypeScript
- NestJS
- Express

### Database
- MongoDB Atlas
- Mongoose

### API Documentation
- Swagger UI
- swagger-jsdoc
- swagger-ui-express

### Gateway
- http-proxy-middleware

### Validation
- class-validator
- class-transformer

---

## 📂 Project Structure


root/
├── api-gateway/
├── product-service/
├── customer-service/
├── inventory-service/
└── order-service/


### Inside each service


src/
├── main.ts
├── app.module.ts
├── dto/
└── schemas/


---

## 🚀 Installation Guide

### 🔹 Prerequisites
- Node.js (v16 or higher)
- npm
- MongoDB Atlas account or local MongoDB

---

### 🔹 Step 1: Clone Repository

```bash
git clone git@github.com:ShalukaPiuminda/MTIT_Assignment.git
cd MTIT_Assignment
🔹 Step 2: Install Dependencies

Run inside each service folder:

npm install
🔹 Step 3: Configure Environment Variables

Create a .env file inside each service:

MONGO_URI=your_mongodb_connection_string
PORT=5001

(Change PORT for each service)

🔹 Step 4: Run Services

Run each service:

npm run start

Run API Gateway:

cd api-gateway
npm run start
🔍 API Documentation (Swagger)
Service	URL
Product	http://localhost:5001/api

Customer	http://localhost:5002/api

Inventory	http://localhost:5003/api

Order	http://localhost:5004/api

Gateway	http://localhost:3000/api
