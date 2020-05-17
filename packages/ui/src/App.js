import React from 'react';
import { ThemeProvider, theme } from '@chakra-ui/core';
import { Switch, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';

import './App.css';
import Home from './components/pages/Home';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <div className="App">
          <Switch>
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
