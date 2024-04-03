import { Group, Skeleton } from "@mantine/core";

export default function ProfileBanner() {
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