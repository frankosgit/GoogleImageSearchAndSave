import { useAuth0 } from '@auth0/auth0-react';
import './App.css'
import Hero from './components/LoginHero'
import LoginHero from './components/LoginHero';

function App() {
  const { isAuthenticated,  } = useAuth0();

  return (
    isAuthenticated ? <Hero/> : <LoginHero/>
  )
}

export default App
