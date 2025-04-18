import { Button } from "@/components/ui/button";
import { FlagIcon, HeartIcon } from "lucide-react";

export default function NameActions() {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      <Button variant="outline" size="sm">
        <HeartIcon className="mr-1 size-4" />
        Like
      </Button>

      <Button variant="outline" size="sm">
        <FlagIcon className="mr-1 size-4" />
        Report
      </Button>
    </div>
  );
}
