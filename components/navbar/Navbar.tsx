"use client"
import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className="bg-white shadow-lg">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between w-full h-16 items-center">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="flex items-center space-x-2">
                            <span className="text-xl font-bold text-gray-800">C&F</span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Items */}
                <div className="hidden md:ml-6 md:flex md:space-x-4">
                    <Link 
                        href="/" 
                        className="inline-flex no-underline items-center px-3 py-2 text-sm font-semibold text-gray-900 hover:text-[#1976D2] hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                        Chats
                    </Link>
                    <Link 
                        href="/bs" 
                        className="inline-flex no-underline items-center px-3 py-2 text-sm font-semibold text-gray-900 hover:text-[#1976D2] hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                        Bootstrap 5
                    </Link>
                </div>


                {/* Right side buttons */}
                <div className="md:hidden flex items-center">
                    <div className="flex md:hidden">
                        <button
                            onClick={toggleMenu}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-[#1976D2] hover:bg-gray-100 transition-colors duration-200"
                        >
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Mobile menu */}
            <div className={`md:hidden ${isOpen ? 'block' : 'hidden'}`}>
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
                    <Link 
                        href="/" 
                        className="block no-underline items-center px-3 py-2 text-sm font-semibold text-gray-900 hover:text-[#1976D2] hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                        Chats
                    </Link>
                    <Link 
                        href="/bs" 
                        className="block no-underline items-center px-3 py-2 text-sm font-semibold text-gray-900 hover:text-[#1976D2] hover:bg-gray-50 rounded-md transition-colors duration-200"
                    >
                        Bootstrap 5
                    </Link>
                </div>
            </div>
        </nav>
    );
}