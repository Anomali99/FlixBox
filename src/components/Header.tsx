import { FC, useState } from "react";
import { appLogo } from "../assets";

const Header: FC<{ index: number }> = (props) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const headerList = [
    { title: "Home", href: "/" },
    { title: "Search", href: "/search" },
    { title: "History", href: "/history" },
  ];

  return (
    <header className="sticky top-0 z-50">
      <nav className="bg-gray-50 border-bgColor border-b-2 px-4 lg:px-6 py-2.5">
        <div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
          <a href="/" className="flex items-center">
            <img src={appLogo} className="mr-3 h-6 sm:h-9" alt="Movie Center" />
            <span className="text-xl font-bold whitespace-nowrap text-primary">
              Flix<span className="text-secondary">Box</span>
            </span>
          </a>

          <button
            onClick={() => setShowMobileMenu(!showMobileMenu)}
            type="button"
            className="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
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
          </button>

          <div
            className={`${
              showMobileMenu ? "block" : "hidden"
            } w-full lg:flex lg:w-auto lg:items-center`}
          >
            <ul
              className={`${
                showMobileMenu ? "flex flex-col mt-4" : ""
              } font-medium lg:flex-row lg:space-x-8 lg:mt-0 lg:flex`}
            >
              {headerList.map((item, index) => (
                <li
                  key={index}
                  className={showMobileMenu ? "mt-2 lg:mt-0" : ""}
                >
                  <a
                    href={item.href}
                    aria-current={props.index === index ? "page" : undefined}
                    className={`block py-2 pr-4 pl-3 ${
                      props.index === index
                        ? "text-primary bg-primary-700 rounded lg:bg-transparent lg:text-primary-700"
                        : "text-gray-700 hover:text-secondary lg:hover:bg-transparent lg:hover:text-primary-700"
                    }`}
                  >
                    {item.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
