# AI-Powered Distributor Onboarding Platform for India

An end-to-end **AI-powered distributor onboarding and management system** built for Indian businesses.  
This platform streamlines distributor onboarding with verification, training, task tracking, certificates, analytics, and AI-based support.

---

## Features

- Role-Based Portals (Vendor and Distributor)
- Guided onboarding journey with tasks and training
- AI Chat Assistant (Gemini-powered, optional)
- Identity Verification (Mock Aadhaar and PAN)
- Auto-generated PDF certificates
- Vendor dashboard with distributor analytics
- Dark-themed modern UI using Tailwind CSS

---

## Tech Stack

### Frontend
- React + Vite  
- Tailwind CSS  

### Backend
- FastAPI (Python)  
- MongoDB  

### AI
- Google Gemini API (optional)

---

## Prerequisites

- Node.js and npm  
- Python 3.9 or higher  
- MongoDB running on `localhost:27017`

---

## Setup and Run

### Backend (FastAPI)

```bash
cd backend
python -m venv venv
.\venv\Scripts\activate        # Windows
# source venv/bin/activate    # macOS/Linux


API Documentation:
http://localhost:8000/docs

Frontend (React + Vite)
cd frontend
npm install
npm run dev


Application URL:
http://localhost:5173

Login Routes

Vendor Portal:

/vendor/login


Distributor Portal:

/distributor/login


Mock Credentials:

Username: raj_distributor
Password: password

AI Configuration (Optional)

Create a .env file inside the backend/ directory:

GEMINI_API_KEY=your_api_key_here


If the API key is not provided, the application will use mock AI responses.

Project Structure
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
│   │   └── index.css        # Tailwind and global styles
│   ├── package.json
│   └── vite.config.js
│
└── README.md

Current Status

Distributor onboarding flow implemented

AI chat support (mock and real)

Certificate generation available

Payments and real KYC planned

Future Enhancements

Real Aadhaar and PAN API integration

Razorpay payment gateway

Mobile application using React Native

Advanced AI nudges and recommendations
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
