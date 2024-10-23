import React from "react";

import {
  PageSection,
} from "@patternfly/react-core";
import { Table, Thead, Tr, Th, Tbody, Td } from "@patternfly/react-table";

import "@patternfly/react-core/dist/styles/base.css";

export interface ReleaseStatusData {
  name: string;
  statusSVG: string;
  repoLink: string;
}


export const ReleaseStatusTable: React.FunctionComponent = () => {

  const columns = ["Repo name", "Release status"];

  const rows: ReleaseStatusData[] = [
    {
      name: "patternfly (core)",
      statusSVG: "https://github.com/patternfly/patternfly/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/patternfly/actions"
    },{
      name: "patternfly-react",
      statusSVG: "https://github.com/patternfly/patternfly-react/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/patternfly-react/actions"
    },{
      name: "react-quickstarts",
      statusSVG: "https://github.com/patternfly/patternfly-quickstarts/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/patternfly-quickstarts/actions"
    },{
      name: "react-user-feedback",
      statusSVG: "https://github.com/patternfly/react-user-feedback/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/react-user-feedback/actions"
    },{
      name: "react-topology",
      statusSVG: "https://github.com/patternfly/react-topology/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/react-topology/actions"
    },{
      name: "react-console",
      statusSVG: "https://github.com/patternfly/react-console/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/react-console/actions"
    },{
      name: "react-log-viewer",
      statusSVG: "https://github.com/patternfly/react-log-viewer/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/react-log-viewer/actions"
    },{
      name: "react-component-groups",
      statusSVG: "https://github.com/patternfly/react-component-groups/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/react-component-groups/actions"
    },{
      name: "react-catalog-view",
      statusSVG: "https://github.com/patternfly/react-catalog-view/actions/workflows/release.yml/badge.svg",
      repoLink: "https://github.com/patternfly/react-catalog-view/actions"
    },
  ];

  return (
    <PageSection hasBodyWrapper isWidthLimited>
      <Table aria-label="Release status of patternfly packages">
        <Thead>
          <Tr>
            {columns.map((column) => (
              <Th key={column}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {rows.map((item, rowIndex) => (
            <Tr key={item.name}>
              <Td dataLabel={columns[0]} width={30}>
                <a href={item.repoLink} target="_blank">{item.name}</a>
              </Td>
              <Td dataLabel={columns[1]} width={30}>
                <img src={item.statusSVG} alt={`Release status for ${item.name}`} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </PageSection>
  );
};
