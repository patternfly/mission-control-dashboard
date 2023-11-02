import { useSession, signIn, signOut } from "next-auth/react";
import { Button } from "@patternfly/react-core";

export function LoginButton() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        <Button variant="tertiary" onClick={() => signOut()}>
          Sign out
        </Button>
      </>
    );
  }
  return (
    <>
      <Button onClick={() => signIn()}>Sign in</Button>
    </>
  );
}
