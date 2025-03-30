"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useSession } from "@/lib/auth-client";
import { LogIn } from "lucide-react";
import Link from "next/link";

export default function Add() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex items-center justify-center py-16">
        <Card className="w-full max-w-md p-6 text-center">
          <CardHeader>
            <CardTitle className="text-lg font-semibold">
              You need to log in
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground">
              Login to add new names and contribute to the community.
            </p>
          </CardContent>

          <CardFooter className="flex justify-center">
            <Button className="mt-4" variant="default" asChild>
              <Link href="/auth?redirect=/submit">
                <LogIn className="mr-2 h-4 w-4" /> Log In
              </Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  return <div>Submit form</div>;
}
