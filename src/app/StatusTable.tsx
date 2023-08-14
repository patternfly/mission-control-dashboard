import React from "react";

import {
  Button,
  Checkbox,
  PageSection,
  Toolbar,
  ToolbarContent,
  ToolbarGroup,
  ToolbarItem,
} from "@patternfly/react-core";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";

import "@patternfly/react-core/dist/styles/base.css";

export interface StatusItem {
  name: string;
  status: string;
  syncStatus: string;
}

export interface StatusTableProps {
  statusItems: StatusItem[];
  selectedItems: string[];
  setSelectedItems: (selectedItems: string[]) => void;
  refresh: () => void;
  submit: () => void;
}

export const StatusTable: React.FunctionComponent<StatusTableProps> = ({
  statusItems,
  selectedItems,
  setSelectedItems,
  refresh,
  submit,
}: StatusTableProps) => {
  const toolbar = (
    <Toolbar>
      <ToolbarContent>
        <ToolbarGroup align={{ default: "alignRight" }}>
          <ToolbarItem>
            <Button variant="secondary" onClick={() => refresh()}>
              Refresh
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            <Button onClick={submit}>Resync repos</Button>
          </ToolbarItem>
        </ToolbarGroup>
      </ToolbarContent>
    </Toolbar>
  );

  const columns = ["Name", "Status", "Synced with upstream?"];

  return (
    <PageSection isWidthLimited>
      {toolbar}
      <Table aria-label="Selectable table">
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
                {item.name}
              </Td>
              <Td dataLabel={columns[1]} width={30}>
                {item.status}
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
