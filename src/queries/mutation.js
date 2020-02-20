import gql from "graphql-tag";

export default gql`
  mutation signup($email: String, $password: String) {
    signUp(email: $email, password: $password) {
      id
      email
      password
      token
    }
  }
`;
