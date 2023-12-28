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

const determineModalSize = (image: any) => {
    // Retrieve the current screen width and height
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Calculate the aspect ratio of the image
    const imageAspectRatio = image.width / image.height;

    // Determine modal dimensions based on screen orientation
    if (screenWidth > screenHeight) {
        // If the screen width is greater than the height
        const modalHeight = screenHeight * 0.75;
        const modalWidth = modalHeight * imageAspectRatio;

        return {
            width: `${modalWidth}px`,
            height: `${modalHeight}px`
        };
    }
    else {
        // If the screen height is greater than the width
        const modalWidth = screenWidth * 0.75;
        const modalHeight = modalWidth / imageAspectRatio;

        return {
            width: `${modalWidth}px`,
            height: `${modalHeight}px`
        };
    }
};

export default function ImageCard(
    { image }: ImageCardProps
) {

    // State to manage the modal visibility
    const [showModal, setShowModal] = useState(false);

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
                        onClick={() => setShowModal(true)}
                    />
                )
            }

            {/* Modal to display the image in a larger view */}
            {
                showModal && (
                    <div className="fixed inset-0 flex items-center justify-center z-50">
                        <div className="absolute inset-0 bg-black opacity-70" onClick={() => setShowModal(false)}></div>
                        <div
                            className={`bg-gray-800 p-4 pb-0 rounded-lg z-10 blur-in-expand`}
                            style={determineModalSize(image)}
                        >
                            <img
                                src={image.download_url}
                                alt={image.author}
                                loading="lazy"
                                className="w-full h-[90%] object-cover rounded-xl"
                            />
                            <p className="p-2 text-center font-semiboldbold text-gray-200 text-sm sm:text-md md:text-lg lg:text-xl">Author: {image.author}</p>
                        </div>
                    </div>
                )
            }
        </div>
    )
}
