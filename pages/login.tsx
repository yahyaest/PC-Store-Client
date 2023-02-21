import { NextPage } from 'next';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useContext, useRef, useState } from 'react';
import { FaFacebookF, FaGithub, FaGoogle } from 'react-icons/fa';

import LoginInput from '../components/login/loginInput';
import SignInWithButton from '../components/login/signInWithButton';
import UserContext from '../store/user.context';

const Login: NextPage = (props: any) => {
  const router = useRouter();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const usernameInputRef = useRef<HTMLInputElement>();
  const emailInputRef = useRef<HTMLInputElement>();
  const passwordInputRef = useRef<HTMLInputElement>();
  const firstNameInputRef = useRef<HTMLInputElement>();
  const lastNameInputRef = useRef<HTMLInputElement>();

  const UserCtx = useContext(UserContext)

  function switchAuthModeHandler() {
    setIsLogin((prevState) => !prevState);
  }

  async function submitHandler(event: React.SyntheticEvent) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current?.value;
    const enteredPassword  = passwordInputRef.current?.value as string;
    const enteredUsename  = usernameInputRef.current?.value as string;
    const enteredFirstName = firstNameInputRef.current?.value;
    const enteredLastName = lastNameInputRef.current?.value;

    if (isLogin) {
     await  UserCtx.login({
          username: enteredUsename,
          password: enteredPassword,
        })
      router.replace("/")
    } else {
    }
  }

  return (
    <section className="h-screen">
      <div className="px-6 h-full text-gray-800">
        <div className="flex xl:justify-center lg:justify-between justify-center items-center flex-wrap h-full g-6">
          <div className="grow-0 shrink-1 md:shrink-0 basis-auto xl:w-6/12 lg:w-6/12 md:w-9/12 mb-12 md:mb-0">
            <Image
              src="https://codedesign.org/storage/app/media/uploaded-files/e-commerce%20agency.png"
              className="w-full"
              alt="Sample image"
              width={1000}
              height={500}
            ></Image>
          </div>
          <div className="xl:ml-20 xl:w-5/12 lg:w-5/12 md:w-8/12 mb-12 md:mb-0">
            <form onSubmit={submitHandler}>
              <div className="flex flex-row items-center justify-center lg:justify-start">
                <p className="text-lg mb-0 mr-4">Sign in with</p>
                <SignInWithButton>
                  <FaFacebookF className="w-4 h-4"></FaFacebookF>
                </SignInWithButton>
                <SignInWithButton>
                  <FaGoogle className="w-4 h-4"></FaGoogle>
                </SignInWithButton>
                <SignInWithButton>
                  <FaGithub className="w-4 h-4"></FaGithub>
                </SignInWithButton>
              </div>

              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center font-semibold mx-4 mb-0">Or</p>
              </div>

              {/* <!--  Inputs --> */}
              {!isLogin && (
                <LoginInput
                  placeholder={"Email address"}
                  type="email"
                  required={true}
                  value={emailInputRef}
                ></LoginInput>
              )}
              {!isLogin && (
                <LoginInput
                  placeholder={"First Name"}
                  type="text"
                  required={true}
                  value={firstNameInputRef}
                ></LoginInput>
              )}
              {!isLogin && (
                <LoginInput
                  placeholder={"Last Name"}
                  type="text"
                  required={true}
                  value={lastNameInputRef}
                ></LoginInput>
              )}
              <LoginInput
                placeholder={"Username"}
                type="text"
                required={true}
                value={usernameInputRef}
              ></LoginInput>
              <LoginInput
                placeholder={"Password"}
                type="password"
                required={true}
                value={passwordInputRef}
              ></LoginInput>

              {isLogin && (
                <div className="flex justify-between items-center mb-6">
                  <div className="form-group form-check">
                    <input
                      type="checkbox"
                      className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                      id="exampleCheck2"
                    />
                    <label
                      className="form-check-label inline-block text-gray-800"
                      htmlFor="exampleCheck2"
                    >
                      Remember me
                    </label>
                  </div>
                  <a href="#!" className="text-gray-800">
                    Forgot password?
                  </a>
                </div>
              )}

              <div className="text-center lg:text-left">
                <button
                  type="submit"
                  className="inline-block px-7 py-3 bg-blue-600 text-white font-medium text-sm leading-snug uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out"
                >
                  {isLogin ? "Login" : "Register"}
                </button>
                <p className="text-sm font-semibold mt-2 pt-1 mb-0">
                  <a
                    href="#!"
                    className="text-red-600 hover:text-red-700 focus:text-red-700 transition duration-200 ease-in-out"
                    onClick={switchAuthModeHandler}
                  >
                    {isLogin
                      ? "Don't have an account? Register"
                      : "Have an account? Sign In"}
                  </a>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context:any) {
  const token = context.req.cookies['auth-token'];

  if (token) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {  },
  };
}

export default Login;

