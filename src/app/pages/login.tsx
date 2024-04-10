'use client';

import Image from "next/image";

export default function Login() {

    return (
        <div className="flex flex-col items-center justify-center w-screen h-screen">
            <Image src="/logo.png" alt="Application Logo" width={300} height={300} />
            <div className="btn btn-outline">
                <a href="/api/auth/login"><h1>Login with SSO</h1></a>
            </div>
        </div>
    );
}