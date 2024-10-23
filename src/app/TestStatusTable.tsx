import React from "react";

import {
  Button,
  Icon,
  PageSection,
  ToggleGroupItem,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import { repoStatus } from "@/getters";
import { useSession } from "next-auth/react";
import { MoonIcon, SunIcon } from '@patternfly/react-icons';
import { LoginButton } from "../components";

import "@patternfly/patternfly/patternfly.css";

export interface TestStatusItem extends Omit<repoStatus, "workflowStatus"> {
  name: string;
  status: string;
}

export interface TestStatusTableProps {
  statusItems: TestStatusItem[];
  refresh: () => void;
  submit: () => void;
  renewBumps: () => void;
}

export const TestStatusTable: React.FunctionComponent<TestStatusTableProps> = ({
  statusItems,
  refresh,
  submit,
  renewBumps,
}: TestStatusTableProps) => {
  const { data: session } = useSession();

  const adminEmails = ["wise.king.sullyman@gmail.com", "dlabaj@redhat.com", "nthoen@redhat.com"];
  const adminAuthenticated = adminEmails.includes(session?.user?.email || "");
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const toggleDarkTheme = (_evt: any, selected: any) => {
    const darkThemeToggleClicked = !selected === isDarkTheme;
    const htmlElement = document.querySelector('html');
    if (htmlElement) {
      htmlElement.classList.toggle('pf-v6-theme-dark', darkThemeToggleClicked);
    }
    setIsDarkTheme(darkThemeToggleClicked);
  };

  const adminControlButtons = (
    <>
      <ToolbarItem>
        <Button variant="tertiary" onClick={() => refresh()}>
          Refresh
        </Button>
      </ToolbarItem>
      <ToolbarItem>
        <Button variant="secondary" onClick={renewBumps}>
          Renew bump PRs
        </Button>
      </ToolbarItem>
      <ToolbarItem>
        <Button onClick={submit}>Resync repos</Button>
      </ToolbarItem>
    </>
  );

  const toolbar = (
    <Toolbar>
      <ToolbarContent>
        <ToolbarGroup align={{ default: "alignEnd" }}>
          {adminAuthenticated && adminControlButtons}
        </ToolbarGroup>
        <ToolbarItem>
          <ToolbarGroup>
            <ToggleGroupItem aria-label="light theme toggle" icon={<Icon size="md"><SunIcon /></Icon>} isSelected={!isDarkTheme} onChange={toggleDarkTheme} />
            <ToggleGroupItem aria-label="dark theme toggle" icon={<Icon size="md"><MoonIcon /></Icon>} isSelected={isDarkTheme} onChange={toggleDarkTheme} />
          </ToolbarGroup>
        </ToolbarItem>
        <ToolbarItem>
          <LoginButton />
        </ToolbarItem>
      </ToolbarContent>
    </Toolbar>
  );

  const columns = ["Name", "Status", "Synced with upstream?"];

  return (
    <PageSection hasBodyWrapper isWidthLimited>
      {toolbar}
      <Table aria-label="Testing status of various repos using the latest patternfly test candidates">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {statusItems.map((item, rowIndex) => (
            <Tr key={item.name}>
              <Td dataLabel={columns[0]} width={30}>
                {<a href={item.upstreamOwnerLink} aria-label={`upstream repo ${item.name}`}>{item.name}</a>}
              </Td>
              <Td dataLabel={columns[1]} width={30}>
                {<a href={item.bumpPRLink} aria-label={`dependency bump PR, status ${item.status}`}>{item.status}</a>}
              </Td>
              <Td dataLabel={columns[1]} width={40}>
                {item.syncStatus.toString()}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </PageSection>
  );
};
