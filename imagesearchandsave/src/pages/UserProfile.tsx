import { useAuth0 } from '@auth0/auth0-react';
import React, { useEffect } from 'react'
import Gallery from '../components/Gallery';
import axios from 'axios';

export const UserProfile = () => {

    const { user } = useAuth0();


    useEffect(() => {
        const fetchUserPhotos = async () => {
            const res = await axios.get(`http://localhost:9090/user/get/123`)
            console.log(res.data)
        }
        fetchUserPhotos()
    }, [])

    return (
        <>
            <div className='w-screen h-screen mx-auto px-8 pt-[6.4rem] bg-secondary text-center'>
                <h2 className='text-3xl'>Welcome to your profile {user?.nickname}</h2>
                <h3 className='text-xl my-3'>Here are your saved photos</h3>
                <img className='w-1/12 mx-auto mt-4' src='../public/hivephoto.png' />
            </div>
            {/*   <Gallery 

            /> */}
        </>
    )
}
