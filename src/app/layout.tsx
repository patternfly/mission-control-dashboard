import React from "react";
import Image from "next/image";
import '@patternfly/react-core/dist/styles/base.css';
import {
  Masthead,
  MastheadBrand,
  MastheadContent,
  MastheadLogo,
  MastheadMain,
  Page,
  PageSection,
  Toolbar,
  ToolbarContent,
  ToolbarItem,
} from "@patternfly/react-core";
import { PageHeader } from '@patternfly/react-component-groups/dist/esm/PageHeader';
import { PageHeaderActions } from "../components/PageHeaderActions";

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps): JSX.Element {
  const [isDarkTheme, setIsDarkTheme] = React.useState(false);

  const logoSrc = isDarkTheme
    ? "/PF-HorizontalLogo-Reverse.svg"
    : "/PF-HorizontalLogo-Color.svg";

  const masthead = (
    <Masthead>
      <MastheadMain>
        <MastheadBrand>
          <MastheadLogo href="https://patternfly.org" target="_blank">
            <Image src={logoSrc} alt="PatternFly logo" height={36} width={175} />
          </MastheadLogo>
        </MastheadBrand>
      </MastheadMain>
      <MastheadContent>
        <Toolbar>
          <ToolbarContent>
            <ToolbarItem align={{ default: "alignEnd" }}>
              <PageHeaderActions isDarkTheme={isDarkTheme} onToggleTheme={setIsDarkTheme} />
            </ToolbarItem>
          </ToolbarContent>
        </Toolbar>
      </MastheadContent>
    </Masthead>
  );

  const headerContent = (
    <PageSection>
      <PageHeader
        title="PatternFly Status Dashboard"
        subtitle="Monitor release and testing status across PatternFly repositories"
      />
    </PageSection>
  );

  return (
    <Page masthead={masthead} sidebar={null} additionalGroupedContent={headerContent}>
      {children}
    </Page>
  );
}
