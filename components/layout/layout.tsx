import { NextPage } from "next";

import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import CookieBar from "./cookie-bar";
import { useAcceptCookies } from "../../utils/use-accept-cookies";

const Layout: NextPage = ({ children }: any) => {
  const { acceptedCookies, onAcceptCookies } = useAcceptCookies();

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main
        className="relative flex-grow"
        style={{
          minHeight: "-webkit-fill-available",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {children}
      </main>
      <Footer />

      <CookieBar
        title="This site uses cookies to improve your experience. By clicking, you agree to our Privacy Policy."
        hide={acceptedCookies}
        action={
          <button
            className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-neutral-900 rounded-lg focus:shadow-outline hover:bg-neutral-800"
            onClick={() => onAcceptCookies()}
          >
            Accept Cookies
          </button>
        }
      />
    </div>
  );
};

export default Layout;
