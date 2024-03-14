import React from 'react';
// import Shell from './components/shell/shell';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestPage from './pages/testpage';
// import InnerHeader from './components/shell/innerHeader';
import { Center } from '@mantine/core';

function App() {

  // const currentPath = window.location.pathname


  return (
    // <Shell path={currentPath}>
      <BrowserRouter>
      <Routes>
        <Route index element = {
            // <InnerHeader>
              <TestPage />
            // </InnerHeader>
        } />
        <Route path="*" element = {
            <Center>Not found</Center>
        } />
      </Routes>
    </BrowserRouter>
    // </Shell>
  );
}

export default App;
