import React, { useContext, useEffect } from "react";
import Shell from "./components/shell/shell";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestPage from "./pages/testPage";
import { Button, Center, Text } from "@mantine/core";

import { useAuth0 } from "@auth0/auth0-react";
import AuthShell from "./components/shell/authShell";
import { UserContext } from "./util/userContext";
import SettingsPage from "./pages/settingsPage";

function App() {
  const { loginWithRedirect, user, isAuthenticated, isLoading } = useAuth0();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);

  if (isLoading) {
    return (
      <AuthShell isLoading={isLoading}/>
    );
  }

  if (!isAuthenticated) {
    // Uncomment this block to show a login button

    // return (
    //   <AuthShell isLoading={isLoading}>
    //     <Button onClick={() => loginWithRedirect()}>Login</Button>
    //   </AuthShell>
    // );

    loginWithRedirect();
    return null;
  }

  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route index element={<TestPage />} />
          <Route
            path="/settings" element={<SettingsPage/>} />
          <Route
            path="*"
            element={
              <Center h={"100%"}>
                <Text size="xl">Page not found</Text>
              </Center>
            }
          />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
