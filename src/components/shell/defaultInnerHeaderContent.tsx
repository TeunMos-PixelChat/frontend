import { Center, Flex, Title } from "@mantine/core";
import ColorSchemeButton from "../colorschemebutton";

export default function DefaultInnerHeaderContent({pageTitle}:{pageTitle:string}) {
  return (
    <Flex h={"100%"}>
      <Center h={"100%"} w={"fit-content"}>
        <Title order={2}>{pageTitle}</Title>
      </Center>

      <div style={{flexGrow:1}}/>

      <Center h={"100%"} w={"fit-content"} style={{padding:"10px"}}>
        <ColorSchemeButton/>
      </Center>
    </Flex>
  );
}