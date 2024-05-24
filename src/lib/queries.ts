"use client";

import { gql } from "@apollo/client";


export const CHARACTERS_QUERY = gql`
  query Query {
    characters {
      results {
        image,
        name,
        id
      }
    }
  }
`;