// lib/apolloClient.js

import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { registerApolloClient } from "@apollo/experimental-nextjs-app-support/rsc";

const { getClient } = registerApolloClient(
  () =>
    new ApolloClient({
      link: new HttpLink({ uri: "https://rickandmortyapi.com/graphql" }),
      cache: new InMemoryCache(),
    })
);

export default getClient();
