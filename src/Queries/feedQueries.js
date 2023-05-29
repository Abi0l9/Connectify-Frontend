import { gql } from "@apollo/client";
import { USER_DETAILS } from "./userQueries";

export const CREATE_FEED = gql`
  mutation createFeed($content: String!, $media: String) {
    createFeed(content: $content, media: $media) {
      ...UserDetails
    }
  }
  ${USER_DETAILS}
`;

export const GET_ALL_FEEDS = gql`
  query {
    getAllFeeds {
      id
      content
      poster {
        id
        name
      }
      time
    }
  }
`;
