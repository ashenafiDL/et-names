import { IdCardIcon } from "lucide-react";

export default function LoginPage({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center justify-center gap-2 self-center font-medium">
          <IdCardIcon /> ET-NAMES
        </div>

        {children}

        <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
          {
            "* This is a password-less login, so you don't need to set passwords."
          }
        </div>
      </div>
    </div>
  );
}
