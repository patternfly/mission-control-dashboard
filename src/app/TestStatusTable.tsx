import React from "react";

import {
  Bullseye,
  Button,
  EmptyState,
  EmptyStateBody,
  EmptyStateVariant,
  PageSection,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";
import SkeletonTable from "@patternfly/react-component-groups/dist/cjs/SkeletonTable";
import ExclamationCircleIcon from "@patternfly/react-icons/dist/dynamic/icons/exclamation-circle-icon";
import { repoStatus } from "@/getters";
import { useSession } from "next-auth/react";

import "@patternfly/react-core/dist/styles/base.css";

export interface TestStatusItem extends Omit<repoStatus, "workflowStatus"> {
  name: string;
  status: string;
}

export interface TestStatusTableProps {
  statusItems: TestStatusItem[];
  isLoading: boolean;
  hasError: boolean;
  refresh: () => Promise<void>;
  submit: () => Promise<void>;
  renewBumps: () => Promise<void>;
}

export const TestStatusTable: React.FunctionComponent<TestStatusTableProps> = ({
  statusItems,
  isLoading,
  hasError,
  refresh,
  submit,
  renewBumps,
}: TestStatusTableProps) => {
  const { data: session } = useSession();

  const adminEmails = ["wise.king.sullyman@gmail.com", "dlabaj@redhat.com", "nthoen@redhat.com"];
  const adminAuthenticated = adminEmails.includes(session?.user?.email || "");
  const [isRefreshing, setIsRefreshing] = React.useState(false);
  const [isRenewing, setIsRenewing] = React.useState(false);
  const [isSyncing, setIsSyncing] = React.useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    refresh().finally(() => setIsRefreshing(false));
  };

  const handleRenewBumps = () => {
    setIsRenewing(true);
    renewBumps().finally(() => setIsRenewing(false));
  };

  const handleSync = () => {
    setIsSyncing(true);
    submit().finally(() => setIsSyncing(false));
  };

  const adminControlButtons = (
    <>
      <ToolbarItem>
        <Button
          variant="tertiary"
          onClick={handleRefresh}
          isLoading={isRefreshing}
          isDisabled={isRefreshing}
          spinnerAriaValueText="Refreshing"
        >
          {isRefreshing ? "Refreshing" : "Refresh"}
        </Button>
      </ToolbarItem>
      <ToolbarItem>
        <Button
          variant="secondary"
          onClick={handleRenewBumps}
          isLoading={isRenewing}
          isDisabled={isRenewing}
          spinnerAriaValueText="Renewing"
        >
          {isRenewing ? "Renewing bump PRs" : "Renew bump PRs"}
        </Button>
      </ToolbarItem>
      <ToolbarItem>
        <Button
          onClick={handleSync}
          isLoading={isSyncing}
          isDisabled={isSyncing}
          spinnerAriaValueText="Syncing"
        >
          {isSyncing ? "Syncing repos" : "Resync repos"}
        </Button>
      </ToolbarItem>
    </>
  );

  const toolbar = adminAuthenticated ? (
    <Toolbar>
      <ToolbarContent>
        <ToolbarGroup align={{ default: "alignEnd" }}>
          {adminControlButtons}
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  ) : null;

  const columns = ["Name", "Status", "Synced with upstream?", "Preview"];

  if (isLoading) {
    return (
      <PageSection isWidthLimited>
        {toolbar}
        <SkeletonTable rowsCount={statusItems.length || 8} columns={columns} />
      </PageSection>
    );
  }

  if (hasError) {
    return (
      <PageSection isWidthLimited>
        {toolbar}
        <Table aria-label="Testing status error">
          <Thead>
            <Tr>
              {columns.map((column) => (
                <Th key={column}>{column}</Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            <Tr>
              <Td colSpan={columns.length}>
                <Bullseye>
                  <EmptyState
                    icon={ExclamationCircleIcon}
                    titleText="Unable to connect"
                    headingLevel="h2"
                    variant={EmptyStateVariant.sm}
                  >
                    <EmptyStateBody>
                      There was an error retrieving data. Check your connection and reload the page.
                    </EmptyStateBody>
                  </EmptyState>
                </Bullseye>
              </Td>
            </Tr>
          </Tbody>
        </Table>
      </PageSection>
    );
  }

  return (
    <PageSection isWidthLimited>
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
          {statusItems.map((item) => (
            <Tr key={item.name}>
              <Td dataLabel={columns[0]} width={30}>
                {<a href={item.upstreamOwnerLink} aria-label={`upstream repo ${item.name}`}>{item.name}</a>}
              </Td>
              <Td dataLabel={columns[1]} width={30}>
                {<a href={item.bumpPRLink} aria-label={`dependency bump PR, status ${item.status}`}>{item.status}</a>}
              </Td>
              <Td dataLabel={columns[2]} width={30}>
                {item.syncStatus.toString()}
              </Td>
              <Td dataLabel={columns[3]} width={10}>
                {item.previewUrl ? (
                  <a href={item.previewUrl} aria-label={`preview for ${item.name}`}>Preview</a>
                ) : (
                  "-"
                )}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </PageSection>
  );
};
