import { IImage } from '../types/googleRes'
import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { UserProfile } from '../models/userProfile';
import toast from 'react-hot-toast';
import { useState } from 'react';


interface IGallery {
    images: IImage[]
    userExists: boolean
}


const Gallery = ({ images, userExists }: IGallery) => {
    const [isLoading, setIsLoading] = useState(false)
    const { user } = useAuth0();


    const handleLike = async (image: IImage) => {
        const auth0Id = user?.sub
        if (userExists && auth0Id) {
            setIsLoading(true)
            const likedImage = {
                imageId: image.link,
                imageURL: image.link
            }

            new UserProfile(auth0Id, [likedImage])

            try {
                const res = await axios.post("http://localhost:9090/user/like", {
                    auth0Id: auth0Id,
                    likedImage: [likedImage]
                })
                console.log(res)
                setIsLoading(false)
                toast.success("success! image liked!")
            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className='flex flex-col items-center bg-secondary'>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {
                    images.map((image) => {
                        return (
                            <div key={image.link} className="relative flex justify-center items-center group w-full h-full">
                                <img onClick={() => handleLike(image)} className="h-auto max-w-full rounded-lg" src={image.link} alt="" />
                                <i className="fas fa-heart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></i>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default Gallery