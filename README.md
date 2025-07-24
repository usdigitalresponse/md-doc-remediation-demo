This contains the Frontend and Backend of the remediate PDF prototype.


## Intro
A comprehensive AI-powered solution for converting PDFs into accessible, tagged documents. This platform consists of a React frontend for user interaction and a FastAPI backend that leverages OpenAI's language models to intelligently tag PDF content for improved accessibility.

This project has two parts 
# Frontend (accessible-pdf-ui)
Technology Stack: React + Vite

The frontend provides an intuitive user interface for uploading PDFs and visualizing the AI-generated accessibility tags. This is built with modern React and Vite for fast development and optimal performance.
# Key Features
- PDF upload interface
- Real-time processing status indicators
- Interactive display of tagged PDF structure
- Responsive design for various screen sizes
- AWS Amplify deployment is ready

  # Backend (accessibility-backend)
Technology Stack: FastAPI + Python 3.11+

The backend is an AI-driven service that processes uploaded PDFs, extracts text and image regions, and uses OpenAI's language models to assign appropriate accessibility tags such as headers, paragraphs, images, and other semantic elements.
# Key Features
- PDF parsing and region extraction using PyMuPDF
- AI-powered content classification using LangChain and OpenAI
- Structured JSON output with accessibility tags
- PDF metadata extraction
- Docker containerization support
- AWS ECR and Fargate deployment ready

## Installation
  Prerequisites
  Frontend:
  - Node.js 18+ and npm/yarn
  - Modern web browser

  Backend:
  - Python 3.11+
  - pip (Python package installer)
  - Docker (for containerized deployment)
  - OpenAI API key

  Setup
  Frontend
  ```bash
      # Clone the frontend repository
      git clone https://github.com/sushilrajeeva/accessible-pdf-ui.git
      cd accessible-pdf-ui
      # Install dependencies
        npm install
  ```
  Backend
  ```bash
      # Clone the backend repository
      git clone https://github.com/sushilrajeeva/accessibility-backend.git
      cd accessibility-backend
      
      # Create and activate virtual environment
      python3.11 -m venv .venv
      source .venv/bin/activate  # macOS/Linux
      # .venv\Scripts\activate   # Windows PowerShell
      
      # Install dependencies
      pip install --upgrade pip
      pip install -r requirements.txt
      
      # Create environment configuration
      cp .env.example .env
      # Edit .env file with your OpenAI API key and other settings
  ```

## Usage
  Running Locally
  Frontend Development Server
  ```bash
    cd accessible-pdf-ui
    npm run dev
    # or
    yarn dev
    
    # Application will be available at http://localhost:5173
  ```
  Backend Development Server
  Option 1: Direct Python execution
  ```bash
    cd accessibility-backend
    source .venv/bin/activate
    uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
    
    # API will be available at http://localhost:8000
    # Health check: GET http://localhost:8000/
    # API endpoint: POST http://localhost:8000/api/ai-tag
  ```

  Option 2: Using Docker

  ```bash
    cd accessibility-backend

    # Build Docker image
    docker build -t accessibility-backend:latest .
    
    # Run container
    docker run --rm -it \
      -p 8000:8000 \
      --env-file .env \
      accessibility-backend:latest
  ```

  # Example Workflow

  Start the backend server (port 8000)
  Start the frontend development server (port 5173)
  Navigate to http://localhost:5173 in your browser
  Upload a PDF file through the interface
  View the AI-generated accessibility tags and structure

## Configuration
  Frontend Environment Variable
  ```env
    # .env file in frontend root
    VITE_API_BASE_URL=http://localhost:8000
    VITE_APP_TITLE="Accessible PDF Platform"
  ```

  Backend Environment Variables
  ```env
    # .env file in backend root
    OPENAI_API_KEY=sk-your_openai_api_key_here
    LLM_MODEL_NAME=gpt-4o-mini
    LLM_TEMPERATURE=0.0
    PROJECT_NAME="PDF AI Tagger"
    VERSION="0.1.0"
    PROJECT_DESCRIPTION="FastAPI service for AI-based PDF tagging"
  ```

## File Structure
Frontend Structure
```bash
      accessible-pdf-ui/
    ├── src/
    │   ├── components/     # React components
    │   ├── pages/         # Page components
    │   ├── hooks/         # Custom React hooks
    │   ├── utils/         # Utility functions
    │   └── styles/        # CSS/styling files
    ├── public/            # Static assets
    ├── index.html         # Entry HTML file
    ├── vite.config.js     # Vite configuration
    └── package.json       # Dependencies and scripts
```

Backend Structure
```bash
    accessibility-backend/
    ├── app/
    │   ├── core/          # Configuration and logging
    │   ├── models/        # Pydantic data models
    │   ├── routes/        # API endpoints
    │   ├── services/      # Business logic (AI tagging, PDF extraction)
    │   ├── utils/         # Helper functions
    │   └── main.py        # FastAPI application
    ├── requirements.txt   # Python dependencies
    ├── Dockerfile         # Container configuration
    └── .env              # Environment variables
```

## Development
- Local development setup
  Frontend Development
  ```bash
    # Install dependencies
    npm install
    
    # Start development server with hot reload
    npm run dev
    
    # Build for production
    npm run build
    
    # Preview production build
    npm run preview
  ```

  Backend Development
  ```bash
    # Activate virtual environment
  source .venv/bin/activate
  
  # Install development dependencies
  pip install -r requirements.txt
  
  # Run with auto-reload
  uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
  
  # Run tests (if available)
  pytest
  
  # Type checking
  mypy app/
  ```


  # API Documentation
  When the backend is running, visit:
  
    - Swagger UI: http://localhost:8000/docs
    - ReDoc: http://localhost:8000/redoc
  
  Main Endpoints
  
    - GET / - Health check
    - GET /api/ping - Service ping
    - POST /api/ai-tag - Upload PDF and get AI-generated accessibility tags
