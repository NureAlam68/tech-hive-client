import { useState } from 'react'
import useAuth from '../../../hooks/useAuth';

function UserProfile() {
  const [isSubscribed, setIsSubscribed] = useState(false)
  const {user} = useAuth();

  return (
    <div className="min-h-screen bg-green-100 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden">
        <div className="p-8">
          <div className="flex flex-col items-center">
            <img
              className="h-32 w-32 rounded-full object-cover"
              src={user?.photoURL}
              alt={user?.displayName}
            />
            <h2 className="mt-4 text-xl font-bold text-gray-900">
              {user?.displayName}
            </h2>
            <p className="text-gray-500">{user?.email}</p>
            
            {isSubscribed ? (
              <div className="mt-6">
                <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-green-100 text-green-800">
                  <svg className="mr-2 h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Status: Verified
                </span>
              </div>
            ) : (
              <button
                className="mt-6 inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Subscribe for $9.99
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserProfile;