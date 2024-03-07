import React from 'react';
import Shell from './components/shell/shell';
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Profilechat from './pages/profilechat';
import InnerHeader from './components/shell/innerHeader';

function App() {

  const currentPath = window.location.pathname


  return (
    <Shell path={currentPath}>
      <BrowserRouter>
      <Routes>
        <Route index element = {
            <InnerHeader>
              <Profilechat />
            </InnerHeader>
        } />
        <Route path="s" element={<div />} />
      </Routes>
    </BrowserRouter>
    </Shell>
  );
}

export default App;
