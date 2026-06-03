import React from 'react'
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="border-t-2 p-4 bg-white md:p-8 lg:p-10 dark:bg-gray-800">
      <div className="mx-auto max-w-screen-xl text-center">
        <ul className="flex flex-wrap justify-center items-center mb-6 text-gray-900 dark:text-white"> 
        </ul>
        <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          ©{" "}
          <Link to="#" className="hover:underline">
            BemberdampakPolsri 2025
          </Link>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  )
}

export default Footer