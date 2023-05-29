import { gql } from "@apollo/client";

export const USER_DETAILS = gql`
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
    messages {
      id
      sender {
        id
        name
      }
      receiver {
        id
        name
      }
      inbox {
        id
        sender {
          id
          name
        }
        content
        time
      }
    }
    friends {
      requests {
        id
        name
        desired_name
      }
      pendings {
        id
        name
        desired_name
      }
      accepted {
        id
        name
        desired_name
      }
    }
    phone
    hobbies
    confirmationCode
    notification {
      id
      count
      content {
        contentType
        message
      }
    }
  }
`;

const FRIEND_FIELDS = gql`
  fragment FriendFields on Friend {
    requests {
      id
      name
      desired_name
    }
    pendings {
      id
      name
      desired_name
    }
    accepted {
      id
      name
      desired_name
    }
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
      desired_name
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser(
    $name: String
    $desired_name: String
    $hobby: String
    $image: String
    $city: String
    $country: String
    $phone: String
  ) {
    updateUser(
      name: $name
      desired_name: $desired_name
      hobby: $hobby
      image: $image
      city: $city
      country: $country
      phone: $phone
    ) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const MAKE_FRIEND_REQUEST = gql`
  mutation makeFriendRequest($friendId: String!) {
    makeFriendRequest(friendId: $friendId) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const ACCEPT_FRIEND_REQUEST = gql`
  mutation acceptFriendRequest($friendId: String!) {
    acceptFriendRequest(friendId: $friendId) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const CANCEL_FRIEND_REQUEST = gql`
  mutation cancelFriendRequest($friendId: String!) {
    cancelFriendRequest(friendId: $friendId) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const DECLINE_FRIEND_REQUEST = gql`
  mutation declineFriendRequest($friendId: String!) {
    declineFriendRequest(friendId: $friendId) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const SEND_MSG = gql`
  mutation sendMsg($receiver: String!, $content: String!) {
    sendMsg(receiver: $receiver, content: $content) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const CLEAR_NOTIFICATIONS = gql`
  mutation ClearNotifications {
    clearNotifications {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

//QUERIES
export const GET_VERIFIED_USERS = gql`
  query {
    getVerifiedUsers {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const GET_USER = gql`
  query getOneUser($getOneUserId: String!) {
    getOneUser(id: $getOneUserId) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const GET_FRIENDS = gql`
  query {
    getFriends {
      ...FriendFields
    }
  }
  ${FRIEND_FIELDS}
`;

//SUBSCRIPTIONS
export const USER_UPDATED = gql`
  subscription {
    userUpdated {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const MADE_FRIEND_REQUEST = gql`
  subscription {
    madeFriendRequest {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const ACCEPTED_FRIEND_REQUEST = gql`
  subscription {
    acceptedFriendRequest {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const CANCELLED_FRIEND_REQUEST = gql`
  subscription {
    cancelledFriendRequest {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const DECLINED_FRIEND_REQUEST = gql`
  subscription {
    declinedFriendRequest {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const SENT_MSG = gql`
  subscription {
    sentMsg {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const FIRST_MSG_BY_SENDER = gql`
  subscription {
    sentMsg {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const FIRST_MSG_TO_RECEIVER = gql`
  subscription {
    sentMsg {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const SENDER_HAS_MSG_HISTORY = gql`
  subscription {
    sentMsg {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const RECEIVER_HAS_MSG_HISTORY = gql`
  subscription {
    sentMsg {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;
