import { getFeaturedName } from "@/actions/names/actions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { HeartIcon, Share2Icon } from "lucide-react";

export default async function FeaturedName() {
  const featuredName = await getFeaturedName();

  if (featuredName === null) return null;

  const likeCount = 0;

  return (
    <Card className="border-primary/20 mx-auto max-w-2xl">
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
      <CardFooter className="flex justify-center gap-4 pt-0">
        <Button variant="outline" size="sm">
          <HeartIcon className="mr-2 h-4 w-4" />
          {likeCount}
        </Button>
        <Button variant="outline" size="sm">
          <Share2Icon className="mr-2 h-4 w-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
