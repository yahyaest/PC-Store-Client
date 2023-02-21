import { useMutation, useQuery } from "@apollo/client";
import { createContext, useEffect, useState } from "react";
import { loginMutation, meQuery } from "../graphQL/userQueries";
import Cookies from "js-cookie";

const UserContext = createContext({
  token:null,
  user: null,
  orderList: null,
  login: function (user: { username: string; password: string }) { },
  logout: function(){}
});

export function UserContextProvider(props: any) {
  const [currentUser, setCurrentUser] = useState<any>();
  const [currentToken, setCurrentToken] = useState<string | null>();
  const userData = useQuery(meQuery, {});
  const [login, loginResult] = useMutation(loginMutation, {
    onCompleted:(data) =>{
         const result = data.login;
      Cookies.set("auth-token", result.token,{expires:7});
    },
  });

  useEffect(() => {
    async function fetchData() {
      const token = Cookies.get("auth-token");
      if (token) {
        setCurrentUser(userData.data?.me);
        setCurrentToken(token)
      }
    }
    fetchData();
  }, [userData]);

  async function loginHandler(user: { username: string; password: string }) {
    await login({
      variables: { username: user.username, password: user.password },
    });
  }

  function logoutHandler(){
    Cookies.remove("auth-token");
    setCurrentToken(null as any)

  }

  const context = {
    token:currentToken,
    user: currentUser,
    orderList: null,
    login: loginHandler,
    logout: logoutHandler,
  };

  return (
    <UserContext.Provider value={context as any}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
