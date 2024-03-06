import React from 'react'
import { IImage } from '../types/googleRes'
import '@fortawesome/fontawesome-free/css/all.min.css';


interface IGallery {
    images: IImage[]
}


const Gallery = ({ images }: IGallery) => {




    return (
        <div className='flex flex-col items-center bg-secondary'>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {images.map((image, index) => {
                return (
                    <div className="relative flex justify-center items-center group w-full h-full">
                    <img className="h-auto max-w-full rounded-lg" src={image.link} alt=""/>
                    <i className="fas fa-heart absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-red-500 text-4xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></i>
                    </div>
                )
            })}
        </div>
        </div>
    )
}

export default Gallery