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
        <div>
            {
                user && (
                    <div>
                        <Image src={user.picture || 'vercel.svg'} alt={user.name || 'User Name'} width={100} height={100} />
                        <h2>{user.name}</h2>
                        <p>{user.email}</p>
                        <a href="/api/auth/logout"><h1>Logout</h1></a>
                    </div>
                )
            }
            <button onClick={() => setRenderGallery(!renderGallery)}>Toggle Gallery</button>
            {
                renderGallery && <Gallery />
            }
        </div>

    );
}