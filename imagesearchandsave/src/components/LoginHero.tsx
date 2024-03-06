import React from 'react'
import LoginButton from './LoginButton'
import { useAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton';

const LoginHero = () => {
    const { user, isAuthenticated, isLoading } = useAuth0();


    return (
        <div className='w-screen h-screen mx-auto px-8 pt-[6.4rem] bg-secondary text-center'>
            <h1 className='text-6xl text-neutral mb-24'> {isAuthenticated ? `Welcome back ${user?.name}` : "Welcome to PhotoHive"}</h1>
            {isAuthenticated ?
                <LogoutButton
                    size="lg"
                    color="primary"
                    text="4xl"
                /> : <LoginButton
                    size="lg"
                    color="primary"
                    text="4xl"
                />
            }
            {!isAuthenticated && <span className='text-2xl ml-4'>to spawn your hive</span>}
            <img className='w-1/6 mx-auto mt-4' src='../public/hivephoto.png' />
        </div>
    )
}

export default LoginHero