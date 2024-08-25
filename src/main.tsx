import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ChakraProvider } from "@chakra-ui/react";
import { App } from "./App";
import { GlobalStyle } from "./globalStyle";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ChakraProvider>
      <GlobalStyle />
      <App />
    </ChakraProvider>
  </StrictMode>
);
