import React from "react";
import { ThemeProvider, theme } from "@chakra-ui/core";
import { Switch, Route, useHistory } from "react-router-dom";
import { SWRConfig } from "swr";

import "./App.css";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";

const getCredentials = () => {
  const credentials = {
    accessKeyId: localStorage.getItem("access-key-id"),
    secretAccessKey: localStorage.getItem("secret-access-key"),
  };
  if (!credentials.accessKeyId || !credentials.secretAccessKey) {
    return null;
  }
  return credentials;
};

function App() {
  const history = useHistory();

  React.useEffect(() => {
    const credentials = getCredentials();

    if (credentials === null) {
      history.push("/login");
    }
  }, [history]);

  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </div>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
