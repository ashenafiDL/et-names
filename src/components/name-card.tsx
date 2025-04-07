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
import { NameWithNicknames } from "@/lib/utils/types";
import { HeartIcon, Share2Icon } from "lucide-react";

export default function NameCard({ name }: { name: NameWithNicknames }) {
  return (
    <Card className="overflow-hidden transition-all hover:scale-[0.98]">
      <CardHeader>
        <CardTitle>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold">{name.name}</h3>
            <Badge>{name.gender}</Badge>
          </div>
        </CardTitle>
        <CardDescription>{name.meaning}</CardDescription>
      </CardHeader>
      <CardContent className="h-full space-y-4">
        <div>{name.additionalInfo}</div>
        <div className="flex flex-row flex-wrap items-center gap-2">
          {name.nicknames.map((nicknameObj, index) => (
            <Badge variant="secondary" key={index}>
              {nicknameObj.nickname.nickname}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="mt-2 flex justify-end gap-4">
        <Button variant="outline" size="sm">
          <HeartIcon className="mr-1 size-4" />
          Like
        </Button>
        <Button variant="outline" size="sm">
          <Share2Icon className="mr-1 size-4" />
          Share
        </Button>
      </CardFooter>
    </Card>
  );
}
