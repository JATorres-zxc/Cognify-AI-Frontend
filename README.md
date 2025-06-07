
## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/JATorres-zxc/Cognify-AI-Frontend.git
   cd Cognify-AI-Frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure API URL:**
   - Create a `.env` file in the root directory.
   - Add your backend URL:
     ```
     REACT_APP_API_URL=http://localhost:8000
     ```
   - Adjust the URL if your backend runs elsewhere.

4. **Start the development server:**
   ```bash
   npm start
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## Usage

1. **Register or log in.**
2. **Upload a PDF or text note** via the Note Upload page.
3. **Generate study materials**:
   - After uploading, select to generate a summary, flashcards, or quiz.
   - View and interact with your generated content.
4. **Check your daily quota** for AI generations.

## API Integration

All API calls are managed in [`src/services/api/ApiService.js`](src/services/api/ApiService.js).  
- JWT tokens are stored in `localStorage` and sent with each request.
- Endpoints include authentication, note upload, content generation, and quota checking.

## Authentication

- Uses JWT tokens for secure API access.
- Auth state is managed via React Context (`src/context/AuthContext.js`).

---

**Backend:**  
This frontend is designed to work with the [SensAI backend](https://github.com/JATorres-zxc/Cognify-AI-Backend) (Django REST API).  
Make sure your backend is running and accessible at the URL specified in your `.env`.

---

**Questions or Issues?**  
Open an issue or contact the maintainer.
