import React, { useEffect, useState } from 'react'
import { IGoogleSearchResponse, IImage } from '../types/googleRes';
import axios from 'axios';
import { GOOGLE_CUSTOM_SEARCH } from '../constants/constants';
import { useAuth0 } from '@auth0/auth0-react';
import Loading from './Loading';
import SearchGallery from './SearchGallery';
import { toast } from 'react-toastify';

const AuthedHero = () => {
    const [query, setQuery] = useState('')
    const [googleRes, setGoogleRes] = useState<IGoogleSearchResponse>()
    const [images, setImages] = useState<IImage[]>([])
    const [userExists, setUserExists] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [likedImagesLocal, setLikedImagesLocal] = useState<IImage[]>()

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(e.target.value)
    }
    const fetchData = async (correctedQuery?: string) => {
        try {
            setIsLoading(true)
            const serachQuery = correctedQuery || query
            const response = await axios.get<IGoogleSearchResponse>(`${GOOGLE_CUSTOM_SEARCH}${import.meta.env.VITE_GOOGLE_KEY}${import.meta.env.VITE_GOOGLE_CX}&num=9&searchType=image&q=${serachQuery}`)
            response && setGoogleRes(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        if (googleRes) {
            console.log(googleRes.items, "google res")
            let imageUrlArray: IImage[] = []
            googleRes.items.forEach((item) => {
                imageUrlArray.push(item)
            })
            updateImages(imageUrlArray)
        }
    }, [googleRes])

    const updateImages = (imageUrlArray: IImage[]) => (
        setImages(imageUrlArray),
        setIsLoading(false)
    )

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            fetchData()
        }
    }

    const handleLike = async (image: IImage) => {
        const auth0Id = user?.sub
        if (userExists && auth0Id) {
            setIsLoading(true)
            const likedImage = {
                imageId: image.link,
                imageURL: image.link
            }

            console.log(images)

            const isAlreadyLiked = likedImagesLocal?.some(img => img.link === image.link);

            if (isAlreadyLiked) {
                toast.error("You've already liked this image")
                setIsLoading(false)
                return
            }


            if (!isAlreadyLiked) {
                try {
                    const res = await axios.post("http://localhost:9090/user/like", {
                        auth0Id: auth0Id,
                        likedImage: [likedImage]
                    })
                    console.log(res)
                    setLikedImagesLocal(prevLikedImages => [...prevLikedImages || [], image])
                    setIsLoading(false)
                    toast("Image added to your favourites!!")

                } catch (error) {
                    console.log(error)
                }
            }
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

        const handleSpellingCorrection = () => {
            const correctedQuery = googleRes?.spelling?.correctedQuery;
            if (correctedQuery) {
                setQuery(correctedQuery);
                const newGoogleRes = {
                    ...googleRes,
                    spelling: { ...googleRes.spelling, correctedQuery: undefined }
                };
                    setGoogleRes(newGoogleRes)
                    fetchData(correctedQuery);
            } else {
                fetchData();
            }
        };

        const handleClick = () => {
            fetchData()
        }

    return (
        <div className='w-screen h-screen mx-auto px-8 pt-[6.4rem] bg-secondary text-center'>
            <div>
                <h2 className='text-3xl'>Search the internet for photos</h2>
                <h3 className='text-xl my-3'>and add them to your hive</h3>
                <img className='w-1/12 mx-auto mt-4' src='/hivephoto.png' />
                <input onChange={onChange} value={query} type="text" placeholder="Type here" onKeyDown={handleKeyDown}
                    className="input input-bordered input-primary w-full max-w-xs mt-12" />
                    { googleRes?.searchInformation.formattedSearchTime &&
                <p className='mt-6'>Search time: {googleRes?.searchInformation.formattedSearchTime} seconds</p>}
                {googleRes?.spelling && <p className='mb-12 mt-6'>Did you mean: <span onClick={handleSpellingCorrection} className= "italic text-primary cursor-pointer">{googleRes.spelling?.correctedQuery} ?</span></p> }
                <button
                    className="ml-6 btn btn-m btn-outline btn-primary text-m"
                    onClick={handleClick}
                > Search
                </button>
            </div>
            <div className='flex justify-center'>
                {isLoading ? <Loading /> :
                    <SearchGallery
                        images={images}
                        userExists={userExists}
                        handleLike={handleLike}
                    />
                }
            </div>
        </div>
    )
}

export default AuthedHero