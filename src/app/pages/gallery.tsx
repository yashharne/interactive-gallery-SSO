"use client";

import { useEffect, useState } from "react";
import ImageCard from "../components/ImageCard";

interface UserProps {
    username: string
}

export default function Gallery({ username }: UserProps) {

    // State to manage the fetched images
    const [images, setImages] = useState<any[]>([]);

    // State to manage the current page number for pagination
    const [page, setPage] = useState(1);

    // Function to fetch a batch of images from the API
    const fetchImages = async () => {
        const res = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=16`);
        const data = await res.json();
        setImages((prevImages) => [...prevImages, ...data.map((item: any) => ({
            id: item.id,
            author: item.author,
            url: item.url,
            download_url: item.download_url
        }))]);
        setPage((prevPage) => prevPage + 1);
    };

    // Initial fetch of images on component mount
    useEffect(() => {
        fetchImages();
    }, []);

    // Infinite scroll functionality to fetch more images as the user scrolls
    useEffect(() => {
        // Event listener function to handle scroll events
        const handleScroll = () => {
            const scrollY = window.scrollY || document.documentElement.scrollTop;
            const totalHeight = document.documentElement.scrollHeight;
            const viewportHeight = window.innerHeight || document.documentElement.clientHeight;

            // Check if the user has scrolled near the bottom of the page
            if (scrollY + viewportHeight + 1 >= totalHeight) {
                fetchImages();
            }
        };

        // Add 'scroll' event listener to the window
        window.addEventListener('scroll', handleScroll);

        // Cleanup function to remove the 'scroll' event listener when the component is unmounted
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [page]);

    return (
        <div>
            <div className="p-8">
                {/* <h1 className="mb-6 text-3xl font-extrabold text-center font-diphylleia font-sans md:text-5xl lg:text-6xl"><span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">Interactive Gallery</span></h1> */}
                <h1 className="mb-6 text-3xl font-extrabold text-center font-sans font-nabla md:text-3xl lg:text-5xl">Welcome to your Interactive Gallery, {username}</h1>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {/* Render the ImageCard component for each image */}
                    {images.map((image, index) => (
                        <div key={index} className="flex items-center justify-center">
                            <ImageCard image={image} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
