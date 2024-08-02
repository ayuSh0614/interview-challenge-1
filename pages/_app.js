import React from 'react';
// import { WindowWidthProvider } from '../contexts/WindowWidthContext';
import { WindowWidthProvider } from '../components/contexts/WindowWidthContext';

const App = ({ Component, pageProps }) => (
  <WindowWidthProvider>
    <Component {...pageProps} />
  </WindowWidthProvider>
);

export default App;
