import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import { MantineProvider } from "@mantine/core";
import "./config/axios";

const root = createRoot(document.getElementById("root"));

root.render(
  <MantineProvider theme={{ colorScheme: "dark" }}>
    <App />
  </MantineProvider>
);
