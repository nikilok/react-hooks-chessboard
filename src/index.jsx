import React from 'react'
import ReactDOM from 'react-dom/client'
import Notification from "./Notification";
import App from "./App";
import GlobalStyle from "./common/globalStyles";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GlobalStyle />
    <Notification>
      <App />
    </Notification>
  </React.StrictMode>,
)
