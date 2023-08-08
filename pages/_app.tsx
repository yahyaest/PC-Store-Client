import type { AppProps } from "next/app";
import { Router } from "next/router";
import NProgress from "nprogress";
import Layout from "../components/layout/layout";
import { ToastContainer } from "react-toastify";
import { CartContextProvider } from "../store/cart.context";
import client from "../graphQL/apollo-client";
import { ApolloProvider } from "@apollo/client";
import { UserContextProvider } from "../store/user.context";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import "nprogress/nprogress.css";
import "react-image-gallery/styles/css/image-gallery.css";
import "react-toastify/dist/ReactToastify.css";

function MyApp({ Component, pageProps }: AppProps) {
  //
  // const [loading, setLoading] = useState(false);
  // useEffect(() => {
  //   const start = () => {
  //     console.log("start");
  //     setLoading(true);
  //   };
  //   const end = () => {
  //     console.log("findished");
  //     setLoading(false);
  //   };
  //   Router.events.on("routeChangeStart", start);
  //   Router.events.on("routeChangeComplete", end);
  //   Router.events.on("routeChangeError", end);
  //   return () => {
  //     Router.events.off("routeChangeStart", start);
  //     Router.events.off("routeChangeComplete", end);
  //     Router.events.off("routeChangeError", end);
  //   };
  // }, []);
  //

  Router.events.on("routeChangeStart", () => NProgress.start());
  Router.events.on("routeChangeComplete", () => NProgress.done());
  Router.events.on("routeChangeError", () => NProgress.done());

  return (
    <ApolloProvider client={client}>
     <UserContextProvider>
       <CartContextProvider>
          <SessionProvider session={pageProps.session}>
            <Layout pageProps={pageProps}>
          <Component {...pageProps} />
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </Layout>
        </SessionProvider>
      </CartContextProvider>
     </UserContextProvider>
    </ApolloProvider>
  );

  //
  //return <>{loading ? <h1>Loading...</h1> : <Component {...pageProps} />}</>;
  //
}

export default MyApp;
