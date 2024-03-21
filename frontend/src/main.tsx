import ReactDOM from 'react-dom/client'
import './index.css'
import { Auth0Provider } from '@auth0/auth0-react'
import { RouterProvider } from 'react-router-dom'
import { router } from './Router/Router'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Auth0Provider
    domain={import.meta.env.VITE_OAUTH_DOMAIN}
    clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    cacheLocation="localstorage"
  >
    <RouterProvider router={router} />
  </Auth0Provider>
)
