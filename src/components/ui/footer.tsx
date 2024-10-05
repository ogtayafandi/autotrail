import React from 'react'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">TrailFinder Haqqında</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="hover:underline">Haqqımızda</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">İcma</h3>
              <ul className="space-y-2">
                <li><Link href="/blog" className="hover:underline">Bloq</Link></li>
                <li><Link href="/careers" className="hover:underline">Karyera</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Dəstək</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="hover:underline">Əlaqə</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Bizimlə əlaqə saxlayın</h3>
              <div className="flex space-x-4">
                <a href="#" className="hover:text-green-400">Facebook</a>
                <a href="#" className="hover:text-green-400">Twitter</a>
                <a href="#" className="hover:text-green-400">Instagram</a>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; 2024 Diginen və TrailFinder. Bütün hüquqlar qorunur.</p>
          </div>
        </div>
      </footer>
  )
}

export default Footer