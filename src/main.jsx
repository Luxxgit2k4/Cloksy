import { StrictMode } from 'react' // Helps to detect potential problems in development mode
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
// BrowserRouter helps to route inside an react app
import { BrowserRouter } from "react-router-dom"; 

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <App />
    </BrowserRouter>
  </StrictMode>,
)
