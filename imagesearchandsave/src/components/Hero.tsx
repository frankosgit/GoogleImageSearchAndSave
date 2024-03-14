import React, { useEffect, useState } from 'react'
import { IGoogleSearchResponse, IImage } from '../types/googleRes';
import Gallery from './SearchGallery';
import axios from 'axios';
import { GOOGLE_CUSTOM_SEARCH } from '../constants/constants';
import { useAuth0 } from '@auth0/auth0-react';
import DotLoader from "react-spinners/DotLoader"
import Loading from './Loading';

const Hero = () => {
    const [query, setQuery] = useState('')
    const [images, setImages] = useState<IImage[]>([])
    const [userExists, setUserExists] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    const fetchData = async () => {
        try {
            setIsLoading(true)
            const response = await axios.get<IGoogleSearchResponse>(`${GOOGLE_CUSTOM_SEARCH}${import.meta.env.VITE_GOOGLE_KEY}${import.meta.env.VITE_GOOGLE_CX}&num=9&searchType=image&q=${query}`)
            let imageUrlArray: IImage[] = []
            response.data.items.forEach((item) => {
                imageUrlArray.push(item)
            })
            updateImages(imageUrlArray)


        } catch (error) {
            console.error(error)
        }
    }

    const updateImages = (imageUrlArray: IImage[]) => (
        setImages(imageUrlArray),
        setIsLoading(false)
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchData()
        }
    }

    const { user } = useAuth0();
    const auth0Id = user?.sub

    useEffect(() => {

        const checkIfUserExists = async () => {
            if (user) {
                try {
                    const res = await axios.get(`http://localhost:9090/user/read/${auth0Id}`);
                    if (res.data) {
                        console.log('User exists', res.data);
                        setUserExists(true);
                    }
                } catch (error: unknown) {
                    if (axios.isAxiosError(error) && error.response) {
                        if (error.response.status === 404) {
                            console.log("User does not exist, creating a profile");
                            try {
                                const userRes = await axios.post(`http://localhost:9090/user/create/`, { auth0Id });
                                console.log('User created successfully', userRes.data);
                                setUserExists(true);
                            } catch (creationError) {
                                console.error("Error creating user profile", creationError);
                                setUserExists(false)
                            }
                        } else {
                            console.error("Error checking user profile", error);
                            setUserExists(false)
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
            <div className='flex justify-center'>
                {isLoading ? <Loading /> :
                    <Gallery
                        images={images}
                        userExists={userExists}
                    />
                }
            </div>
        </div>
    )
}

export default Hero