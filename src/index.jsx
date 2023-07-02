import ReactDOM from 'react-dom/client'
import { ReactNotifications } from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import App from './App.jsx'
import GlobalStyle from './common/globalStyles'
import { StrictMode } from 'react'

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GlobalStyle />
    <ReactNotifications />
    <App />
  </StrictMode>
)
