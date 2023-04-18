import { gql } from "@apollo/client";

const meQuery = gql`
  query me {
    me {
      id
      username
      firstName
      lastName
      isStaff
      email
      verified
    }
  }
`;

const createUserMutation = gql`
mutation createUser($username: String!, $firstName: String = "", $lastName: String = "", $email: String!, $password: String!, $verified: Boolean = false) {
  createUser(input: {username: $username, firstName: $firstName, lastName: $lastName, email: $email, password: $password, verified: $verified}) {
    user {
      id
      username
      firstName
      lastName
      email
      verified
      isStaff
    }
  }
}
`;

const loginMutation = gql`
mutation login($username:String!,$password:String!){
  login(username: $username,password: $password){
    token
    refreshToken
  }
}
`;

export { meQuery ,createUserMutation,
loginMutation};
