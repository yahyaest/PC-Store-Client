import { NextPage } from 'next';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

import cartContext from '../../store/cart.context';
import userContext from '../../store/user.context';
import { DEFlag } from './icons/DEFlag';
import { ESFlag } from './icons/ESFlag';
import { SAFlag } from './icons/SAFlag';
import { USFlag } from './icons/USFlag';


const languageMenu = [
  {
    id: "ar",
    name: "عربى - AR",
    value: "ar",
    icon: <SAFlag width="20px" height="15px" />,
  },
  {
    id: "en",
    name: "English - EN",
    value: "en",
    icon: <USFlag width="20px" height="15px" />,
  },
  {
    id: "de",
    name: "Deutsch - DE",
    value: "de",
    icon: <DEFlag width="20px" height="15px" />,
  },
  {
    id: "es",
    name: "Español - ES",
    value: "es",
    icon: <ESFlag width="20px" height="15px" />,
  },
];

const Navbar: NextPage = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
  const [toggleUserMenu, setToggleUserMenu] = useState(false);
  const [toggleLanguageDropdown, setToggleLanguageDropdown] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState(languageMenu[1]);
  const cartCtx = useContext(cartContext)
  const userCtx = useContext(userContext)
  const router = useRouter();

  const handleLogin = ()=>{
            userCtx.token ? userCtx.logout() : router.replace("/login")
          }

 //console.log(userCtx.token)

  return (
    <nav className="bg-red-700  px-2 sm:px-4 py-2.5 rounded  sticky top-0 z-50 max">
      <div className="container flex flex-wrap justify-between items-center mx-auto ">
        {/* Logo */}
        <a href="https://flowbite.com" className="flex items-center">
          <img
            src="https://flowbite.com/docs/images/logo.svg"
            className="mr-3 h-6 sm:h-9"
            alt="Flowbite Logo"
          ></img>
          <span className="self-center text-xl font-semibold whitespace-nowrap dark:text-white">
            Flowbite
          </span>
        </a>
        <div className="flex items-center md:order-2">
          {/* Language Switcher */}
          <div className="language">
            <button
              id="dropdownDefault"
              data-dropdown-toggle="dropdown"
              className="text-black bg-slate-200 hover:bg-slate-300 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center "
              type="button"
              onClick={() => {
                setToggleLanguageDropdown(!toggleLanguageDropdown);
              }}
            >
              <div className="flex text-black ">
                <div className="flag-icon mx-2"> {currentLanguage.icon}</div>
                {currentLanguage.name}
              </div>

              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </button>
            {/* <!-- Dropdown menu --> */}
            <div
              id="dropdown"
              className={`z-10 ${
                toggleLanguageDropdown ? "" : "hidden"
              } bg-white divide-y divide-gray-100 rounded shadow w-44 `}
            >
              <ul
                className="py-1 text-sm text-gray-200"
                aria-labelledby="dropdownDefault"
              >
                {languageMenu.map((language) => (
                  <li
                    key={language.id}
                    onClick={() => {
                      setCurrentLanguage(language);
                      setToggleLanguageDropdown(false);
                    }}
                  >
                    <div className="flex px-4 py-2 text-black hover:bg-gray-100  cursor-pointer">
                      <div className="flag-icon mx-2"> {language.icon}</div>
                      {language.name}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Search bar */}
          <div className="hidden relative md:block mx-2">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar"
              className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            ></input>
          </div>

          {/* User Settings */}
          <button
            type="button"
            className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 "
            id="user-menu-button"
            aria-expanded="false"
            data-dropdown-toggle="dropdown"
            onClick={() => {
              setToggleUserMenu(!toggleUserMenu);
            }}
          >
            <span className="sr-only">Open user menu</span>
            <img
              className="w-8 h-8 rounded-full"
              src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
              alt="user photo"
            ></img>
          </button>

          <div
            className={`${
              toggleUserMenu ? "" : "hidden"
            }   z-50 my-4 text-base list-none bg-red-300 rounded divide-y divide-gray-100 shadow`}
            id="dropdown"
            style={{
              position: "absolute",
              inset: "55px 20px auto auto",
              margin: "0px",
              //  transform: "translate(1015px, 1782px)",
            }}
            data-popper-placement="bottom"
          >
            <div className="py-3 px-4">
              <span className="block text-sm text-gray-900 dark:text-white">
                Bonnie Green
              </span>
            </div>
            <ul className="py-1" aria-labelledby="dropdown">
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Settings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Earnings
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
                >
                  Sign out
                </a>
              </li>
            </ul>
          </div>

          {/* Cart Logo */}
          <div className="flex mx-3">
            <FaShoppingCart className=" text-amber-400 text-xl transition-all hover:text-amber-500"></FaShoppingCart>
            <span className="inline-flex items-center justify-center px-2 py-1 mr-2 text-xs font-bold leading-none text-red-100 bg-red-500 rounded-full">
              {cartCtx.cart_items_size}
            </span>
          </div>

          {/* Login */}
          <div  className = "cursor-pointer" onClick={handleLogin}>
            <p>{ userCtx.token ? "Logout" : "Login"}</p>
          </div>


          {/* Toggle Menu */}
          <button
            data-collapse-toggle="mobile-menu-2"
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="mobile-menu-2"
            aria-expanded="false"
            onClick={() => {
              setToggleMenu(!toggleMenu);
            }}
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
            <svg
              className="hidden w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
        {/* Menu */}
        <div
          className={`${
            toggleMenu ? "" : "hidden"
          } justify-between items-center w-full md:flex md:w-auto md:order-1`}
          id="mobile-menu-2"
        >
          <div className="relative mt-3 md:hidden">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="search-navbar-mobile"
              className="block p-2 pl-10 w-full text-gray-900 bg-gray-50 rounded-lg border border-gray-300 sm:text-sm focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..."
            ></input>
          </div>

          <ul className="flex flex-col mt-4 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-medium">
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white"
                aria-current="page"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Services
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Pricing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="block py-2 pr-4 pl-3 text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-gray-400 md:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
