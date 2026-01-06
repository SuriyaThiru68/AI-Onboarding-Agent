# 🤖 AI-Powered Distributor Onboarding Platform for India 🇮🇳

An end-to-end **AI-powered distributor onboarding and management system** built for Indian businesses.  
This platform streamlines distributor onboarding with verification, training, task tracking, certificates, analytics, and AI-based support.

---

## 🚀 Features

- 🔐 Role-Based Portals (Vendor & Distributor)
- 🧭 Guided onboarding journey with tasks & training
- 🧠 AI Chat Assistant (Gemini-powered, optional)
- 🪪 Identity Verification (Mock Aadhaar / PAN)
- 📄 Auto-generated PDF certificates
- 📊 Vendor dashboard with distributor analytics
- 🌙 Dark Neon UI using Tailwind CSS

---

## 🛠️ Tech Stack

### Frontend
- React + Vite  
- Tailwind CSS  

### Backend
- FastAPI (Python)  
- MongoDB  

### AI
- Google Gemini API (optional)

---

## 📦 Prerequisites

- Node.js & npm  
- Python 3.9+  
- MongoDB (running on `localhost:27017`)  

---

## ⚙️ Setup & Run

### 1️⃣ Backend (FastAPI)

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate        # Windows
# source venv/bin/activate    # macOS/Linux

pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000

API Documentation:
http://localhost:8000/docs

2️⃣ Frontend (React + Vite)
cd frontend
npm install
npm run dev


App URL:
http://localhost:5173

🔑 Login Routes

Vendor Portal:

/vendor/login


Distributor Portal:

/distributor/login


Mock Credentials:

Username: raj_distributor
Password: password

🤖 AI Configuration (Optional)

Create a .env file inside backend/:

GEMINI_API_KEY=your_api_key_here


If the key is not provided, the app runs using mock AI responses.

📂 Project Structure
.
├── backend
│   ├── app
│   │   ├── main.py          # FastAPI entry point
│   │   ├── routes           # API routes
│   │   ├── models           # Database models
│   │   └── services         # AI, certificates, business logic
│   ├── requirements.txt
│   └── .env
│
├── frontend
│   ├── src
│   │   ├── App.jsx          # Routing
│   │   ├── pages            # Pages
│   │   ├── components       # Reusable components
│   │   └── index.css        # Tailwind & global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md

🧪 Current Status

✅ Distributor onboarding flow implemented

✅ AI chat (mock + real)

✅ Certificate generation

🚧 Payments & real KYC (planned)

🌱 Future Enhancements

Real Aadhaar / PAN API integration

Razorpay payment gateway

Mobile app (React Native)

Advanced AI nudges & recommendations
