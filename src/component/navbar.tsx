'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-slate-900 shadow-lg">
      <div className="flex justify-between items-center px-6 py-5">
        {/* Left: Logo */}
        <h1 className="text-2xl font-bold text-white">Foodiya</h1>

        {/* Hamburger Menu (mobile only) */}
        <div className="md:hidden text-white text-2xl cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FiX /> : <FiMenu />}
        </div>

        {/* Right: Menu Links - Desktop */}
        <div className="hidden md:flex justify-around space-x-8 text-white">
          <Link href="/item" className="hover:text-blue-500">Menu</Link>
          <Link href="/cart" className="hover:text-blue-500">Cards</Link>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="flex flex-col md:hidden px-6 pb-4 text-white space-y-3">
          <Link href="/item" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Menu</Link>
          <Link href="/cart" className="hover:text-blue-500" onClick={() => setIsOpen(false)}>Cards</Link>
        </div>
      )}
    </div>
  );
}

export default Navbar;
