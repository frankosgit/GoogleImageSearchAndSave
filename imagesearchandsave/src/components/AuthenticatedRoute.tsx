import { useAuth0 } from '@auth0/auth0-react';
import React from 'react'
import LoginHero from './LoginHero';

interface IAuthenticatedRouteProps {
    children: React.ReactNode;
  }

const AuthenticatedRoute = ({ children }: IAuthenticatedRouteProps) => {
    const { isAuthenticated } = useAuth0();

    return isAuthenticated ? children : <LoginHero />
}

export default AuthenticatedRoute