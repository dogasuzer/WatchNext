import React, { useCallback, useEffect, useState } from 'react';
import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import Image from 'next/image';
import { BiBell } from 'react-icons/bi';
import { BiSearchAlt } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import useScrollStore from '@/hooks/useScrollStore';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const { setScroll } = useScrollStore();
  const handleNavbarItemClick = (destination: string) => {
    setScroll(destination);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackground(true);
      } else {
        setShowBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleAccountMenu = useCallback(() => {
    setShowAccountMenu(current => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(current => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 h-40 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? 'bg-black bg-opacity-90' : ''
        }`}
      >
        <Image
          src="/images/logo.png"
          className="hidden lg:flex "
          width={400}
          height={200}
          alt="Logo"
        />
        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <div onClick={() => handleNavbarItemClick('home')}>
            <NavbarItem label="Home" />
          </div>
          <div onClick={() => handleNavbarItemClick('newPopular')}>
            <NavbarItem label="New & Popular" />
          </div>
          <div onClick={() => handleNavbarItemClick('myList')}>
            <NavbarItem label="My List &#10084; " />
          </div>
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <FaChevronDown
            className={`w-4 text-white fill-white transition ${
              showMobileMenu ? 'rotate-180' : 'rotate-0'
            }`}
          />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BiSearchAlt className="w-20" />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer transition">
            <BiBell className="w-20" />
          </div>
          <div
            onClick={toggleAccountMenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden"></div>
            <FaChevronDown
              className={`w-4 text-white fill-white transition ${
                showAccountMenu ? 'rotate-180' : 'rotate-0'
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
