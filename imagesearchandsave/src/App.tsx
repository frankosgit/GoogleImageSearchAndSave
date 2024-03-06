import { useAuth0 } from '@auth0/auth0-react';
import './App.css'
import LoginHero from './components/LoginHero';
import Hero from './components/Hero';
import { useEffect } from 'react';

function App() {
  const { isAuthenticated, isLoading } = useAuth0();

  useEffect(() => {
    if (isAuthenticated) {
      console.log('user is authenticated')
    }
  },[])

  if(isLoading) return <div>Loading...</div>
  
  return (
    isAuthenticated ? <Hero/> : <LoginHero/>
  )
}

export default App
