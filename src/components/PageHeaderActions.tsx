import React from "react";
import { ToggleGroup, ToggleGroupItem } from "@patternfly/react-core";
import { MoonIcon, SunIcon } from "@patternfly/react-icons";
import { LoginButton } from "./loginButton";

export interface PageHeaderActionsProps {
  isDarkTheme: boolean;
  onToggleTheme: (isDark: boolean) => void;
}

export const PageHeaderActions: React.FunctionComponent<PageHeaderActionsProps> = ({
  isDarkTheme,
  onToggleTheme,
}) => {
  const toggleDarkTheme = (_evt: any, selected: any) => {
    const darkThemeToggleClicked = !selected === isDarkTheme;
    const htmlElement = document.querySelector("html");
    if (htmlElement) {
      htmlElement.classList.toggle("pf-v6-theme-dark", darkThemeToggleClicked);
    }
    onToggleTheme(darkThemeToggleClicked);
  };

  return (
    <>
      <ToggleGroup>
        <ToggleGroupItem aria-label="light theme toggle" icon={<SunIcon />} isSelected={!isDarkTheme} onChange={toggleDarkTheme} />
        <ToggleGroupItem aria-label="dark theme toggle" icon={<MoonIcon />} isSelected={isDarkTheme} onChange={toggleDarkTheme} />
      </ToggleGroup>
      <LoginButton />
    </>
  );
};
