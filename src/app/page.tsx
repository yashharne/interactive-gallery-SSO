'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import Logout from './pages/logout';
import Login from './pages/login'

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;
  console.log("Current User: ", user);

  return (
    <div>
      {
        // user ? <Logout user={user} /> : <Login />
        user ? <Logout /> : <Login />
      }
    </div>
  );
}