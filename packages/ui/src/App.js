import React from "react";
import { ThemeProvider, theme, Input } from "@chakra-ui/core";

import "./App.css";
const customTheme = {
  ...theme,
  colors: {
    ...theme.colors,
    brand: {
      900: "#1a365d",
      800: "#153e75",
      700: "#2a69ac",
    },
  },
};

function App() {
  const [apiKey, setApiKey] = React.useState(localStorage.getItem("api-key"));
  const [apiKeyInput, setApiKeyInput] = React.useState(apiKey);
  return (
    <ThemeProvider theme={customTheme}>
      <div className="App">
        {apiKey === null && (
          <Input
            value={apiKeyInput || ""}
            onChange={(e) => setApiKeyInput(e.target.value)}
            data-test-id="api-key-input"
            onBlur={(e) => {
              setApiKey(apiKeyInput);
              localStorage.setItem("api-key", apiKeyInput);
            }}
          />
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
