"use client";

import { Button } from "@/components/ui/button";
import { useSession } from "@/lib/auth-client";
import { formatNumber } from "@/lib/utils/formatters";
import { NameWithNicknames } from "@/lib/utils/types";
import { FlagIcon, HeartIcon, Share2Icon } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SharePopup from "./share-popup";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

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
  const { data: session } = useSession();

  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/name/like/${name.id}`,
        {
          method: "POST",
        },
      );

      if (!res.ok) {
        throw Error();
      }

      setLikes((prev) => {
        if (res.status === 200) {
          return prev - 1;
        } else {
          return prev + 1;
        }
      });
      setLiked(res.status === 200 ? false : true);
    } catch {
      toast.error("Failed to update like. Pleas try again later");
    }
  };

  useEffect(() => {
    const getLikeInfo = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/name/get-like-info/${name.id}`,
        );

        if (!res.ok) {
          throw Error();
        }

        const data = await res.json();
        setLikes(data.likeCount);
        setLiked(data.likedByCurrentUser);
      } catch {}
    };

    getLikeInfo();
  }, [name.id]);

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {showLike && (
        <Tooltip>
          <TooltipTrigger asChild>
            <span>
              <Button
                variant="outline"
                size="sm"
                disabled={!session?.session}
                onClick={handleLike}
              >
                <HeartIcon
                  className="mr-1 size-4"
                  color={liked ? "var(--destructive)" : "var(--primary)"}
                  fill={liked ? "var(--destructive)" : "transparent"}
                />
                <span>{formatNumber(likes)}</span>
              </Button>
            </span>
          </TooltipTrigger>
          {!session?.session && (
            <TooltipContent>You need to login to like names.</TooltipContent>
          )}
        </Tooltip>
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
