// Custom component to display Google Material Icons as a React component (with mantine styling)

import { Center } from "@mantine/core";

export default function GoogleIcon({ icon, size = 20, color }: Readonly<{ icon: string | React.ReactNode; size?: string | number; color?: string | undefined; }>) {

  // default to the text color
  const Defaultcolor = 'var(--mantine-color-text)';

  return (
    <Center>
      <span className="material-symbols-outlined" style={{height:'100%', width:'100%', fontSize:size, color: color || Defaultcolor}}>{icon}</span>
    </Center>
  );
}