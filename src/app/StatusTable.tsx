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
  syncStatus: boolean;
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
  const setRowSelected = (repoName: string, isSelecting = true) =>
    setSelectedItems((prevSelected) => {
      const otherSelectedRows = prevSelected.filter((r) => r !== repoName);
      return isSelecting ? [...otherSelectedRows, repoName] : otherSelectedRows;
    });
  const selectAllRows = (isSelecting = true) =>
    setSelectedItems(isSelecting ? statusItems.map((item) => item.name) : []);
  const isRowSelected = (repoName) => selectedItems.includes(repoName);

  const BulkSelectCheckbox = () => {
    const numSelected = selectedItems.length;
    const allSelected = numSelected === statusItems.length;
    const anySelected = numSelected > 0;
    const someChecked = anySelected ? null : false;
    const isChecked = allSelected ? true : someChecked;

    return (
      <Checkbox
        id="split-dropdown-checkbox"
        key="split-dropdown-checkbox"
        aria-label={anySelected ? "Deselect all cards" : "Select all cards"}
        isChecked={isChecked}
        onClick={() => {
          anySelected ? setSelectedItems([]) : selectAllRows();
        }}
      />
    );
  };

  const toolbar = (
    <Toolbar>
      <ToolbarContent>
        <ToolbarGroup>
          <ToolbarItem variant="bulk-select">
            <BulkSelectCheckbox />
          </ToolbarItem>
        </ToolbarGroup>
        <ToolbarGroup align={{ default: "alignRight" }}>
          <ToolbarItem>
            <Button variant="secondary" onClick={() => refresh()}>
              Refresh
            </Button>
          </ToolbarItem>
          <ToolbarItem>
            <Button onClick={submit}>Resync selected repos</Button>
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
            <Th />
            {columns.map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {statusItems.map((item, rowIndex) => (
            <Tr key={item.name}>
              <Td
                select={{
                  rowIndex,
                  onSelect: (_event, isSelecting) =>
                    setRowSelected(item.name, isSelecting),
                  isSelected: isRowSelected(item.name),
                }}
              />
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
