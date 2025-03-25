import React from "react";

const Header = () => {
  return (
    <div className="flex justify-between items-center p-6">
      <div>Logo</div>
      <nav>
        <ul className="flex justify-between items-center space-x-4">
          <li>
            <a href="/" className="text-green-500 hover:text-green-600">
              Home
            </a>
          </li>
          <li>
            <a href="/about" className="text-green-500 hover:text-green-600">
              About us
            </a>
          </li>
          <li>
            <a href="/products" className="text-green-500 hover:text-green-600">
              Products
            </a>
          </li>
          <li>
            <a href="/contact" className="text-green-500 hover:text-green-600">
              Contacts
            </a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
