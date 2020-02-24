import gql from "graphql-tag";

//returned based upon databankUser
export default gql`
  mutation register(
    $email: String
    $password: String
    $tier: String
    $interest: String
    $organization: String
    $job_position: String
    $country: String
  ) {
    register(
      email: $email
      password: $password
      tier: $tier
      interest: $interest
      organization: $organization
      job_position: $job_position
      country: $country
    ) {
      id
      email
      tier
      interest
      organization
      job_position
      country
      token
    }
  }
`;
