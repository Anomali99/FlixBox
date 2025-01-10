import { FC } from "react";

const Footer: FC = () => {
  const menuList = [
    { title: "Home", href: "/" },
    { title: "Search", href: "/search" },
    { title: "History", href: "/history" },
  ];
  return (
    <footer className="mt-auto w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6">
      <span className="text-sm text-gray-500 sm:text-center">
        © 2025{" "}
        <a href="https://github.com/Anomali99/" className="hover:underline">
          Anomali99
        </a>
        . All Rights Reserved.
      </span>
      <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
        {menuList.map((item, index) => (
          <li key={index}>
            <a href={item.href} className="hover:underline me-4 md:me-6">
              {item.title}
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;
