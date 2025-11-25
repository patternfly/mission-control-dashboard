import { Inter } from "next/font/google";
import '@patternfly/react-core/dist/styles/base.css';
import { Page } from "@patternfly/react-core";

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: LayoutProps): JSX.Element {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Page>
          {children}
        </Page>
      </body>
    </html>
  );
}
