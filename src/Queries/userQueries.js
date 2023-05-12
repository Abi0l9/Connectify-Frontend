import { gql } from "@apollo/client";

const USER_DETAILS = gql`
  fragment UserDetails on User {
    id
    name
    email
    desired_name
    gender
    city
    country
    continent
    image
    phone
    hobbies
  }
`;

export const CREATE_USER = gql`
  mutation createUser(
    $name: String!
    $email: String!
    $gender: String!
    $password: String!
    $phone: String!
  ) {
    createUser(
      name: $name
      email: $email
      gender: $gender
      password: $password
      phone: $phone
    ) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;
