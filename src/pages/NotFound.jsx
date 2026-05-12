import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const NotFound = () => (
  <div className="max-w-3xl flex flex-col mx-auto size-full">
    <main id="content" className="flex-grow">
      <div className="text-center py-10 px-4 sm:px-6 lg:px-8">
        <h1 className="block text-7xl font-bold text-gray-900 sm:text-9xl">404</h1>
        <p className="mt-3 text-gray-500">Oops, something went wrong.</p>
        <p className="text-gray-500">Sorry, we couldn't find your page.</p>
        <div className="mt-5 flex flex-col justify-center items-center gap-2 sm:flex-row sm:gap-3">
          <Link to="/" className="w-full sm:w-auto py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg bg-avery-red text-white bg-red-700">
            <ArrowLeft size={16} />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  </div>
)
export default NotFound