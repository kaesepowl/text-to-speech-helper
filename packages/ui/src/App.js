import React from 'react';
import { ThemeProvider, theme, CSSReset, Box } from '@chakra-ui/core';
import { Switch, Route } from 'react-router-dom';
import { SWRConfig } from 'swr';

import Home from './components/pages/Home';

function App() {
  return (
    <SWRConfig
      value={{
        fetcher: (...args) => fetch(...args).then((res) => res.json()),
      }}
    >
      <ThemeProvider theme={theme}>
        <CSSReset />
        <Box margin={6}>
          <Switch>
            <Route path="/">
              <Home />
            </Route>
          </Switch>
        </Box>
      </ThemeProvider>
    </SWRConfig>
  );
}

export default App;
