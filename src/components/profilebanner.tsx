import { Avatar, Group, Skeleton, Text } from "@mantine/core";
import { UserContext } from "../util/userContext";
import { useContext } from "react";



export default function ProfileBanner() {
  const { user } = useContext(UserContext);

  if (user) {
    return (
      <Group dir="row" align="center" style={{width: "100%"}}>
        <Avatar src={user.picture} alt={user.name} />
        <Group w={"60%"} gap={"xs"}>
          <Text>{user.name}</Text>
          {/* <Text>STATUS</Text> */}
        </Group>
      </Group>
    );
  }

  return (
      <Group dir="row" align="center" style={{width: "100%"}}>
        <Skeleton height={50} circle />
        <Group w={"60%"}>
          <Skeleton height={10} width="100%" radius="xl" />
          <Skeleton height={8} width="50%" radius="xl" />
        </Group>
      </Group>
  );
}