import React from 'react';
import Link from 'next/link';
import { UserButton, SignInButton, useUser } from "@clerk/nextjs";

const Navigation: React.FC = () => {
  const { isSignedIn } = useUser();

  return (
    <>
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          AI Code Review
        </Link>
        <div className="space-x-4">
          <Link href="/dashboard" className="hover:text-gray-300">
            Dashboard
          </Link>
          {isSignedIn ? (
            <UserButton afterSignOutUrl="/" />
          ) : (
            <SignInButton mode="modal">
              <button className="bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded">
                Sign In
              </button>
            </SignInButton>
          )}
        </div>
      </div>
    </nav>
    </>
  );
};

export default Navigation;