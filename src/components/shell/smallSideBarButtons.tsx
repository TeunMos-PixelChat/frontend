import React, { useEffect, useState } from "react";
import { ActionIcon, Center, Flex, Stack } from "@mantine/core";
import styles from "./smallSideBar.module.css";
import GoogleIcon from "../googleIcon";
import { useNavigate, useLocation } from "react-router-dom";

export type Page = {
  path: string; // Path to the page
  icon: string; // Google Icon name
  title: string; // Title of the page
};

export default function SmallSidebarButtons() {
  const navigate = useNavigate();
  const location = useLocation();
  const [activatedButton, setActivatedButton] = useState<typeof pages[number]["path"]>("home");

  const pages: Page[] = [
    { path: "/", icon: "home", title: "Home" },
    { path: "/search", icon: "search", title: "Search" },
    { path: "/notifications", icon: "notifications", title: "Notifications" },
  ];

  useEffect(() => {
    const path = location.pathname.split("/")[1] ?? "";
    if (path === "") {
      setActivatedButton("/");
    } else {
      setActivatedButton("/" + path);
    }
    
  }, [location]);

  function navigateTo(page: Page) {
    setActivatedButton(page.title.toLowerCase());
    navigate(page.path);
  }

  return (
    <Center className={styles.container}>
      <Stack className={styles.buttonscontainer}>
        {pages.map((page) => (
          <SidebarButton
          key={page.path}
          icon={page.icon}
          active={activatedButton === page.path}
          onClick={() => navigateTo(page)}
        />))}
      </Stack>

      <Flex h={"100%"} className={styles.bottombuttons}>
        <div style={{ flexGrow: 1 }} />
        <Stack className={styles.buttonscontainer}>
          {/* <ColorSchemeButton /> */}
          <SidebarButton
            icon={"settings"}
            active={activatedButton === "/settings"}
            onClick={() => navigate("/settings")}
          />
        </Stack>
        
      </Flex>
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
