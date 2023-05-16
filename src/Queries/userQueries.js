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
    confirmationCode
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

export const CONFIRM_USER_REG = gql`
  mutation confirmUserReg($email: String!, $regCode: String!) {
    confirmUserReg(email: $email, regCode: $regCode) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const RESEND_CODE = gql`
  mutation resendCode($email: String!) {
    resendCode(email: $email) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      userId
      token
      image
      name
    }
  }
`;

export const CREATE_FEED = gql`
  mutation createFeed($content: String!, $media: String) {
    createFeed(content: $content, media: $media) {
      id
      content
      poster
      time
    }
  }
`;

export const GET_ALL_FEEDS = gql`
  mutation getAllFeeds($content: String!, $media: String!) {
    getAllFeeds(content: $content, media: $media) {
      id
      content
      poster
      time
    }
  }
`;

export const GET_VERIFIED_USERS = gql`
  query {
    getVerifiedUsers {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;
