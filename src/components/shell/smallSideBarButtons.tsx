import React, { useEffect, useState } from "react";
import { ActionIcon, Center, Stack } from "@mantine/core";
import styles from "./smallSideBar.module.css";
import GoogleIcon from "../googleIcon";
import { useNavigate, useLocation } from "react-router-dom";

export type navButton = "home" | "search" | "notifications";

export default function SmallSidebarButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activatedButton, setActivatedButton] = useState<navButton>("home");


  useEffect(() => {
    const path = location.pathname.split("/")[1] ?? "";
    if (path === "") {
      setActivatedButton("home");
    } else {
      setActivatedButton(path as navButton);
    }
    
  }, [location]);

  function navigateTo(path: string, button: navButton) {
    setActivatedButton(button);
    navigate(path);
  }

  return (
    <Center className={styles.container}>
      <Stack>
        <SidebarButton
          icon="home"
          active={activatedButton === "home"}
          onClick={() => navigateTo("/", "home")}
        />
        <SidebarButton
          icon="search"
          active={activatedButton === "search"}
          onClick={() => navigateTo("/search", "search")}
        />
        <SidebarButton
          icon="notifications"
          active={activatedButton === "notifications"}
          onClick={() => navigateTo("/notifications", "notifications")}
        />
      </Stack>
    </Center>
  );
}

function SidebarButton({
  icon,
  active,
  onClick,
}: {
  icon: string;
  active: boolean;
  onClick?: () => void;
}) {
  return (
    <ActionIcon
      variant={active ? "default" : "transparent"}
      size="lg"
      onClick={onClick}
    >
      <GoogleIcon icon={icon} size={20} color={"var(--mantine-color-text)"} />
    </ActionIcon>
  );
}
