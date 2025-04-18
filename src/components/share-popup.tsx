"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useState } from "react";
import {
  FacebookIcon,
  FacebookShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  TelegramIcon,
  TelegramShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { Button } from "./ui/button";

export default function SharePopup({ name }: { name: string }) {
  const [copied, setCopied] = useState(false);

  const shareUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/browse/${name}`;
  const shareTitle = `Check out the name "${name}" on ${process.env.NEXT_PUBLIC_BASE_URL}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000); // reset after 2 seconds
  };

  return (
    <div>
      <div className="space-y-4">
        <div className="space-x-3">
          <TelegramShareButton url={shareUrl} title={shareTitle}>
            <TelegramIcon size={32} round />
          </TelegramShareButton>

          <LinkedinShareButton url={shareUrl} title={shareTitle}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>

          <FacebookShareButton
            url={shareUrl}
            hashtag="#etnames"
            title={shareTitle}
          >
            <FacebookIcon size={32} round />
          </FacebookShareButton>

          <TwitterShareButton url={shareUrl} title={shareTitle}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
        </div>

        <div className="pt-2">
          <h3 className="mb-2 text-sm font-medium">Copy link</h3>
          <div className="flex gap-2">
            <div className="bg-muted flex-1 truncate rounded-md px-3 py-2 font-mono text-sm">
              {shareUrl}
            </div>
            <Button variant="secondary" onClick={handleCopy}>
              {copied ? (
                <CheckIcon className="text-emerald-600" />
              ) : (
                <CopyIcon />
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
