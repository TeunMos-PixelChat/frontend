import React, {useContext, useEffect} from "react";
import Shell from "./components/shell/shell";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import TestPage from "./pages/testpage";
import InnerHeader from "./components/shell/innerHeader";
import { Button, Center } from "@mantine/core";

import { useAuth0 } from "@auth0/auth0-react";
import AuthShell from "./components/shell/authShell";
import { UserContext } from "./util/userContext";

function App() {
  const { loginWithRedirect, logout, user, isAuthenticated, isLoading } = useAuth0();
  const { setUser } = useContext(UserContext);

  useEffect(() => {
    setUser(user);
  }, [user, setUser]);


  if (!isAuthenticated) {
    return (
      <AuthShell isLoading={false}>
        <Button onClick={() => loginWithRedirect()}>
          Login 
        </Button>
        ({isLoading ? "true" : "false"})
        <Button onClick={() => logout()}>
          Logout
        </Button>
      </AuthShell>
    );
  }

  

  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route
            index
            element={
              <InnerHeader>
                <TestPage />
              </InnerHeader>
            }
          />
          <Route
            path="*"
            element={
              <Center>Not found `{isAuthenticated ? "true" : "false"}`</Center>
            }
          />
        </Routes>
      </Shell>
    </BrowserRouter>
  );
}

export default App;
