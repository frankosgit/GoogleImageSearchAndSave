import '@fortawesome/fontawesome-free/css/all.min.css';
import axios from 'axios';
import { useAuth0 } from '@auth0/auth0-react';
import { LikedImage } from '../models/likedImageType';
import { toast } from 'react-toastify';


interface ILikedGallery {
    images: LikedImage[]
    updateDislikeLocal: (image: LikedImage) => void
}



const LikedGallery = ({ images, updateDislikeLocal }: ILikedGallery) => {

    const { user } = useAuth0();

    const handleUnlike = async (image: LikedImage) => {
        const auth0Id = user?.sub
        if (auth0Id) {
            const likedImage = {
                imageId: image.imageURL,
                imageURL: image.imageURL
            }
            try {
                console.log(likedImage.imageURL)
                const res = await axios.post("http://localhost:9090/user/unlike", {
                    auth0Id: auth0Id,
                    likedImage: likedImage
                })
                console.log("disliked image" + res)
                updateDislikeLocal(image)
                toast("Unliked image!")

            } catch (error) {
                console.log(error)
            }
        }
    }


    return (
        <div className='flex flex-col items-center bg-secondary h-full'>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {
                    images.map((image) => {
                        return (
                            <div key={image._id} className="relative flex justify-center items-center group w-full h-full">
                                <img onClick={() => handleUnlike(image)} className="h-auto max-w-full rounded-lg" src={image.imageURL} alt="" />
                                <i className="fas fa-heart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></i>
                            </div>
                        )
                    })}
            </div>
        </div>
    )
}

export default LikedGallery