import React, { useCallback, useEffect, useState } from 'react';
import AccountMenu from '@/components/AccountMenu';
import MobileMenu from '@/components/MobileMenu';
import NavbarItem from '@/components/NavbarItem';
import Image from 'next/image';
import { BiSearchAlt } from 'react-icons/bi';
import { FaChevronDown } from 'react-icons/fa';
import useScrollStore from '@/hooks/useScrollStore';
import SearchBar from './SearchBar';
import { AiOutlineClose } from 'react-icons/ai';

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showBackground, setShowBackground] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);

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
    console.log('first');
    setShowAccountMenu(current => !current);
  }, []);

  const toggleMobileMenu = useCallback(() => {
    setShowMobileMenu(current => !current);
  }, []);

  const toggleSearchBar = useCallback(() => {
    setShowSearchBar(current => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={` px-4 h-15 lg:h-40 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? 'bg-black bg-opacity-90' : ''
        }`}
      >
        <Image
          src="/images/logo.png"
          className="hidden md:flex md:w-1/4 lg:w-1/5"
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
            {showSearchBar ? (
              <div
                className="flex bg-zinc-700 items-center rounded-md
              bg-opacity-40 md:h-8 md:w-40 lg:w-60 h-6 gap-2 "
              >
                <SearchBar />
                <AiOutlineClose
                  onClick={toggleSearchBar}
                  className="text-white md:w-8 w-4"
                />
              </div>
            ) : (
              <div onClick={toggleSearchBar}>
                <BiSearchAlt className="text-white md:w-8 w-4" />
              </div>
            )}
          </div>

          <div className="flex flex-row items-center gap-2 cursor-pointer relative">
            <FaChevronDown
              onClick={toggleAccountMenu}
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
