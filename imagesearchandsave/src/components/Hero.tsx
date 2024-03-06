import React from 'react'
import { IGoogleSearchResponse, IImage } from '../types/googleRes';
import Gallery from './Gallery';
import axios from 'axios';
import { GOOGLE_CUSTOM_SEARCH } from '../constants/constants';

const Hero = () => {
    const [query, setQuery] = React.useState('')
    const [images, setImages] = React.useState<IImage[]>([])

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

    return (
        <div className='w-screen h-screen mx-auto px-8 pt-[6.4rem] bg-secondary text-center'>
            <div>
                <h2 className='text-3xl'>Search the internet for photos</h2>
                <h3 className='text-xl my-3'>and add them to your hive</h3>
                <input onChange={onChange} type="text" placeholder="Type here" onKeyDown={handleKeyDown}
 className="input input-bordered input-primary w-full max-w-xs mb-12" />
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