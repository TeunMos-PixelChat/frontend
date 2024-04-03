import React from 'react';
import Shell from './components/shell/shell';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestPage from './pages/testpage';
import InnerHeader from './components/shell/innerHeader';
import { Center } from '@mantine/core';

function App() {

  return (
      <BrowserRouter>
        <Shell>
          <Routes>
            <Route index element = {
                <InnerHeader>
                  <TestPage />
                </InnerHeader>
            } />
            <Route path="*" element = {
                <Center>Not found</Center>
            } />
          </Routes>
        </Shell>
      </BrowserRouter>
  );
}

export default App;
