import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import Navbar from './components/Navbar.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  /*   <Auth0Provider
      domain="{yourDomain}"
      clientId="{yourClientId}"
      authorizationParams={{
        redirect_uri: window.location.origin
      }}
    >
      <App />
    </Auth0Provider> */
  <>
    <Navbar />
    <App />
  </>
)
