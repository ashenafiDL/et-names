import { Button } from "@/components/ui/button";
import { NameWithNicknames } from "@/lib/utils/types";
import { FlagIcon, HeartIcon, Share2Icon } from "lucide-react";
import SharePopup from "./share-popup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

type NameActionProps = {
  name: NameWithNicknames;
  showLike?: boolean;
  showShare?: boolean;
  showReport?: boolean;
};

export default function NameActions({
  name,
  showLike = false,
  showShare = false,
  showReport = false,
}: NameActionProps) {
  return (
    <div className="flex flex-wrap justify-center gap-3">
      {showLike && (
        <Button variant="outline" size="sm">
          <HeartIcon className="mr-1 size-4" />
          Like
        </Button>
      )}

      {showShare && (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Share2Icon className="mr-1 size-4" />
              Share
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader className="mb-2">
              <DialogTitle>Share this name</DialogTitle>
              <DialogDescription>
                Share this beautiful Ethiopian name with friends and family.
              </DialogDescription>
            </DialogHeader>
            <SharePopup name={name.name} />
          </DialogContent>
        </Dialog>
      )}

      {showReport && (
        <Button variant="outline" size="sm">
          <FlagIcon className="mr-1 size-4" />
          Report
        </Button>
      )}
    </div>
  );
}
