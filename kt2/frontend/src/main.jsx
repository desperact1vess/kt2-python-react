import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { apollo } from "./apolloClient";
import App from "./App";
import "./App.css";

createRoot(document.getElementById("root")).render(
  <ApolloProvider client={apollo}>
    <App />
  </ApolloProvider>
);
