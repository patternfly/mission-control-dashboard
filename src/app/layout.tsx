import Head from "next/head";
import { Inter } from "next/font/google";
import '@patternfly/react-core/dist/styles/base.css';
import { Page } from "@patternfly/react-core";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps): JSX.Element {
  return (
      <Page>
        {children}
      </Page>
  );
}
