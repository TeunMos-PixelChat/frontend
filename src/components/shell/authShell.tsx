import { Center, Loader } from "@mantine/core";


export default function AuthShell({ children, isLoading = false }: { children?: React.ReactNode, isLoading?: boolean }) {
  return (
      <Center style={{height: "100vh", width: "100vw"}}>
        {isLoading ? <Loader size={75}/> : children}
      </Center>
  );
}