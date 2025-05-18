import { Badge } from "@/components/ui/badge";
import { getFeaturedName } from "@/lib/db/queries";
import Link from "next/link";
import NameActions from "./name-actions";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

export default async function FeaturedName() {
  const featuredName = await getFeaturedName();

  if (featuredName === null) return null;

  return (
    <Card className="border-primary/20 mx-auto max-w-2xl">
      <Link href={`/browse/${featuredName.name}`} className="h-full">
        <CardHeader className="pb-2 text-center">
          <div className="mb-2 flex justify-center">
            <Badge className="bg-primary/10 text-primary border-0">
              Featured Name
            </Badge>
          </div>
          <CardTitle className="text-4xl font-bold">
            {featuredName.name}
          </CardTitle>
          {featuredName.meaning && (
            <CardDescription className="text-lg">
              {featuredName.meaning}
            </CardDescription>
          )}
        </CardHeader>
        <CardContent className="space-y-4 pb-4 text-center">
          <div className="flex justify-center gap-3">
            <Badge variant="outline">{featuredName.gender}</Badge>
          </div>
          {featuredName.additionalInfo && (
            <p className="text-muted-foreground mx-auto max-w-md">
              {featuredName.additionalInfo}
            </p>
          )}
        </CardContent>
      </Link>
      <CardFooter className="flex justify-center gap-4 pt-0">
        <NameActions name={featuredName} showLike showShare />
      </CardFooter>
    </Card>
  );
}
