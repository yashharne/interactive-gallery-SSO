'use client';

export default function Login() {

    return (
        <div className="flex items-center justify-center w-screen h-screen">
            <div className="btn btn-outline">
                <a href="/api/auth/login"><h1>Login with SSO</h1></a>
            </div>
        </div>
    );
}