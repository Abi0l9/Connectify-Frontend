import { gql } from "@apollo/client";

export const CREATE_FEED = gql`
  mutation createFeed($content: String!, $media: String) {
    createFeed(content: $content, media: $media) {
      content
    }
  }
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
      likes
    }
  }
`;

export const GET_ONE_FEED = gql`
  query getOneFeed($feedId: String!) {
    getOneFeed(id: $feedId) {
      id
      content
      poster {
        id
        name
      }
      time
      likes
    }
  }
`;

export const LIKE_FEED = gql`
  mutation likeFeed($feedId: String!) {
    likeFeed(feedId: $feedId) {
      id
      content
      likes
    }
  }
`;
