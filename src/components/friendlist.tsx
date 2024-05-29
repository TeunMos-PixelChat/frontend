
import React, { useContext, useEffect, useState } from "react";
// import { UserContext } from "../util/providers/userContext";
import { Avatar, Button, Center, Stack, Title, Text } from "@mantine/core";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllUsersExceptMe, type GetUserResponse } from "../util/userServiceFunctions";
import { useLocation, useNavigate } from "react-router-dom";


export default function FriendList() {
  // const { user } = useContext(UserContext);
  const { getAccessTokenSilently, user } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  const [users, setUsers] = useState<GetUserResponse[] | null>();
  const [activatedButton, setActivatedButton] = useState<string | null>();

  useEffect(() => {
    if (!user) {
      return;
    }

    getAccessTokenSilently({
      authorizationParams: {
        audience: process.env.REACT_APP_AUTH0_AUDIENCE,
      },
    }).then(token => {
      getAllUsersExceptMe(token, user?.sub || "").then(res => {
        setUsers(res);
      });
    });

  }, [getAccessTokenSilently, user]);


  useEffect(() => {
    const path = location.pathname.split("/")[2] ?? "";
    const decodedPath = decodeURIComponent(path);
    setActivatedButton(decodedPath);
  }, [location, users]);

  function navigateTo(user: GetUserResponse) {
    setActivatedButton(user.id);
    navigate(`/dm/${user.id}`);
  }

  return (
    <Stack>
      <Center>
        <Text>FriendList</Text>
      </Center>

      {users?.map(user => (
        <Stack style={{marginInline: "10px"}} gap='xs'>
          <UserButton user={user} navigateTo={navigateTo} isActive={activatedButton === user.id}/>
        </Stack>
      ))}
      
    </Stack>
  );
}


function UserButton({
  user,
  navigateTo,
  isActive,
}: {
  user: GetUserResponse;
  navigateTo: (user: GetUserResponse) => void;
  isActive?: boolean;
}) {
  return (
    <Button leftSection={<Avatar src={user.picture}/>} 
      variant={isActive ? "filled" : "default"}
      size="lg" 
      justify="space-between" 
      fullWidth
      onClick={() => navigateTo(user)}>
      
      <Center>{user.nickname}</Center>
    </Button>
  );
}