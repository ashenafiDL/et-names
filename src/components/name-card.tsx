import { Badge } from "@/components/ui/badge";
import { NameWithNicknames } from "@/lib/utils/types";
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

export default function NameCard({ name }: { name: NameWithNicknames }) {
  return (
    <Card className="overflow-hidden transition-all hover:scale-[0.98]">
      <Link href={`/browse/${name.name}`} className="h-full">
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
      </Link>
      <CardFooter className="mt-2 flex justify-end gap-4">
        <NameActions name={name} showLike showShare />
      </CardFooter>
    </Card>
  );
}
