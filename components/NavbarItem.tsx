import React from 'react';

interface NavbarItemProps {
  label: string;
}

const NavbarItem: React.FC<NavbarItemProps> = ({ label }) => {
  return (
    <div
      className={
        'text-white cursor-default hover:text-gray-500 cursor-pointer transition'
      }
    >
      {label}
    </div>
  );
};

export default NavbarItem;
