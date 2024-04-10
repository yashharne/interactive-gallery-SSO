'use client';

import Image from 'next/image';
import { useUser } from '@auth0/nextjs-auth0/client';
import Link from 'next/link';
import Gallery from './gallery';
import { useState } from 'react';


// interface User {
//     name: string;
//     email: string;
//     picture: string;
// }

// interface LogoutProps {
//     user: User;
// }


// export default function Logout({ user }: LogoutProps) {
export default function Logout() {

    const { user, error, isLoading } = useUser();
    const [renderGallery, setRenderGallery] = useState(false);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error.message}</div>;
    console.log("Current User: ", user);

    return (
        <div className='flex flex-col items-center'>
            {
                user && (
                    <div className='flex w-full justify-between'>
                        <div className="avatar online m-8">
                            <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img src={user.picture || "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"} />
                            </div>
                        </div>
                        {/* <div>
                            <Image src={user.picture || 'vercel.svg'} alt={user.name || 'User Name'} width={100} height={100} />
                        </div> */}
                        <div className='flex flex-col flex-grow justify-center gap-1'>
                            <h2 className='text-2xl font-semibold'>{user.name}</h2>
                            <p className='font-normal'>{user.email}</p>
                        </div>
                        <div className='flex items-center justify-center p-8'>
                            <a href="/api/auth/logout" className="btn btn-outline btn-error"><h1>Logout</h1></a>
                        </div>
                    </div>
                )
            }
            {/* <button className='btn btn-outline w-1/3' onClick={() => setRenderGallery(!renderGallery)}>Toggle Gallery</button> */}
            <input
                type="checkbox"
                aria-label={renderGallery ? "Hide Gallery" : "Show Gallery"}
                className="btn btn-outline w-1/3"
                checked={renderGallery}
                onChange={() => setRenderGallery(!renderGallery)}
            />
            {
                renderGallery && <Gallery username={user ? user.name || '' : 'User'} />
            }
        </div>

    );
}