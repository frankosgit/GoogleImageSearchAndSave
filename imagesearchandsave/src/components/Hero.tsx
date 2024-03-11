import React, { useEffect } from 'react'
import { IGoogleSearchResponse, IImage } from '../types/googleRes';
import Gallery from './Gallery';
import axios from 'axios';
import { GOOGLE_CUSTOM_SEARCH } from '../constants/constants';
import { User, useAuth0 } from '@auth0/auth0-react';

const Hero = () => {
    const [query, setQuery] = React.useState('')
    const [images, setImages] = React.useState<IImage[]>([])
    const [userExists, setUserExists] = React.useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    const fetchData = async () => {
        try {
            const response = await axios.get<IGoogleSearchResponse>(`${GOOGLE_CUSTOM_SEARCH}${import.meta.env.VITE_GOOGLE_KEY}${import.meta.env.VITE_GOOGLE_CX}&num=9&searchType=image&q=${query}`)
            let imageUrlArray: IImage[] = []
            response.data.items.forEach((item) => {
                imageUrlArray.push(item)
            })
            setImages(imageUrlArray)
        } catch (error) {
            console.error(error)
        }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchData()
        }
    }

    const { user } = useAuth0();

    useEffect(() => {

        const checkIfUserExists = async () => {
            if (user) {
                try {
                    const res = await axios.get(`http://localhost:9090/user/read/${user.sub}`);
                    if (res.data) {
                        console.log('User exists', res.data);
                        setUserExists(true);
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error) && error.response) {
                        if (error.response.status === 404) {
                            console.log("User does not exist, creating a profile");
                            try {
                                const userRes = await axios.post(`http://localhost:9090/user/create/`, { auth0Id: user.sub });
                                console.log('User created successfully', userRes.data);
                                setUserExists(true);
                            } catch (creationError) {
                                console.error("Error creating user profile", creationError);
                            }
                        } else {
                            console.error("Error checking user profile", error);
                        }
                    }
                }
            }
        };
        checkIfUserExists();
    }, [user]);

    return (
        <div className='w-screen h-screen mx-auto px-8 pt-[6.4rem] bg-secondary text-center'>
            <div>
                <h2 className='text-3xl'>Search the internet for photos</h2>
                <h3 className='text-xl my-3'>and add them to your hive</h3>
                <img className='w-1/12 mx-auto mt-4' src='../public/hivephoto.png' />
                <input onChange={onChange} type="text" placeholder="Type here" onKeyDown={handleKeyDown}
                    className="input input-bordered input-primary w-full max-w-xs my-12" />
                {/* <span className="loading loading-infinity loading-lg"></span> */}
                <button
                    className="ml-6 btn btn-m btn-outline btn-primary text-m"
                    onClick={fetchData}
                > Search
                </button>
            </div>
            <Gallery
                images={images}
            />
        </div>
    )
}

export default Hero