import { NextPage } from "next";
import { useTranslation } from "next-i18next";

import React from "react";
import Navbar from "./navbar";
import Footer from "./footer";
import CookieBar from "./cookie-bar";
import { useAcceptCookies } from "../../utils/use-accept-cookies";

const Layout: NextPage = ({ children }: any) => {
  const { t } = useTranslation("common");
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
        title={t("text-cookies-title")}
        hide={acceptedCookies}
        action={
          <button
            className="h-10 px-5 m-2 text-indigo-100 transition-colors duration-150 bg-neutral-900 rounded-lg focus:shadow-outline hover:bg-neutral-800"
            onClick={() => onAcceptCookies()}
          >
            {t("text-accept-cookies")}
          </button>
        }
      />
    </div>
  );
};

export default Layout;
