import Link from 'next/link'
import React from 'react'
import { Button } from './button'


const Navbar = () => {
  return (
    <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-green-600">TrailFinder</Link>
          <nav>
            <ul className="flex space-x-4 items-center">
              <li><Link href="/explore" className="text-gray-600 hover:text-green-600">Discover</Link></li>
              <li><Link href="/saved" className="text-gray-600 hover:text-green-600">Saved</Link></li>
              <li><Link href="/login"><Button variant="outline">Log in</Button></Link></li>
            </ul>
          </nav>
        </div>
      </header>
  )
}

export default Navbar