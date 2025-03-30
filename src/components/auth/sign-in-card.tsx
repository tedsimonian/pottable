"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import Github from "~/components/icon/github";

import { authClient } from "~/lib/auth-client";
import { getInternalRoute } from "~/lib/internal-routes";

type SignInCardProps = {
  redirectTo?: string | null;
};

export const SignInCard = (props: SignInCardProps) => {
  const { redirectTo } = props;

  const handleGithubLogin = async () => {
    await authClient.signIn.social({
      provider: "github",
      callbackURL: redirectTo ?? getInternalRoute("home", null),
      newUserCallbackURL: getInternalRoute("onboarding", null),
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with your Discord account</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                className="w-full"
                onClick={handleGithubLogin}
              >
                <Github />
                Login with Github
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
};

export default SignInCard;
