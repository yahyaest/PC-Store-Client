import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import Cookies from "js-cookie";

const httpLink = createHttpLink({
  uri: "http://127.0.0.1:8000/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = Cookies.get("auth-token");
  return {
    headers: {
      ...headers,
      authorization: token ? `JWT ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

// const client = new ApolloClient({
//   uri: "http://127.0.0.1:8000/graphql",
//   cache: new InMemoryCache(),
//  connectToDevTools: true,
//   credentials: "same-origin",
//    headers: {
//     "X-CSRFToken": Cookies.get("csrftoken"),
//   },
// });

export default client;
