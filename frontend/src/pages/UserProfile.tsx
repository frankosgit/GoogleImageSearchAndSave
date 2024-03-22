import { useAuth0 } from '@auth0/auth0-react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { LikedImage } from '../models/likedImageType';
import LikedGallery from '../components/LikedGallery';

interface IRecievedUserProfile {
    user: {
        _id: string,
        auth0Id: string,
        likedImages: LikedImage[]
    }
}



export const UserProfile = () => {
    const { user, isLoading } = useAuth0();
    const [likedImages, setLikedImages] = useState<LikedImage[]>()



    const updateDislikeLocal = (dislikedImage: LikedImage) => {
        setLikedImages(likedImages?.filter((image) => image.imageURL !== dislikedImage.imageURL))
    }

    useEffect(() => {
        const fetchUserPhotos = async () => {
            if (user) {
                const auth0Id = user.sub
                try {
                    const res = await axios.get<IRecievedUserProfile>(`http://localhost:9090/user/read/${auth0Id}`)
                    console.log(res.data)
                    setLikedImages(res.data.user.likedImages)
                } catch (error) {
                    console.log(error)
                }
            } else {
                console.log("cannot find user")
            }
        }
        fetchUserPhotos()
    }, [user, isLoading])



    return (
        <>
            <div className='w-screen h-screen mx-auto px-8 pt-[6.4rem] bg-secondary text-center'>
                <h2 className='text-3xl'>Welcome to your profile {user?.nickname}</h2>
                <img className='w-1/12 mx-auto mt-4' src='/hivephoto.png' />


                {likedImages && likedImages.length > 0 ?
                    <LikedGallery
                        images={likedImages}
                        updateDislikeLocal={updateDislikeLocal}
                    /> :
                    <h1 className='text-2xl mt-24'>Get started by liking some photos and we'll save them here for you! </h1>

                }

            </div>
        </>
    )
}
