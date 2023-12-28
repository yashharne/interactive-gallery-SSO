import { useState } from "react";
import LoadingPlaceholder from "./LoadingPlaceholder";

interface ImageCardProps {
    image: {
        id: string;
        author: string;
        url: string;
        download_url: string;
    }
}

export default function ImageCard(
    { image }: ImageCardProps
) {

    // State to manage the image loading state
    const [loading, setLoading] = useState(true);

    // Function to handle the image load event
    const handleImageLoad = () => {
        setLoading(false);
    };

    return (

        <div className="card items-center justify-center w-6/8 bg-base-100 shadow-xl rounded-xl overflow-hidden">
            {/* Display the loading placeholder if the image is still loading */}
            {loading && <LoadingPlaceholder />}

            {/* Display the image if download_url exists */}
            {
                image.download_url && (
                    <img
                        src={image.download_url}
                        alt={image.author}
                        loading="lazy"
                        className="w-full h-full object-cover rounded-xl transform scale-100 hover:scale-95 transition-transform duration-300 ease-in-out cursor-pointer"
                        onLoad={handleImageLoad}
                    />
                )
            }
        </div>
    )
}
