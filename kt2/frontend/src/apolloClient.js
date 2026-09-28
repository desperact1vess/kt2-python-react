import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";

export const apollo = new ApolloClient({
  link: new HttpLink({ uri: "http://localhost:8001/graphql" }),
  cache: new InMemoryCache(),
});
