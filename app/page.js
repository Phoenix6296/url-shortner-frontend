"use client";
import {
  Button,
  Input,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/UI";
import { copyToClipboard } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [url, setUrl] = useState("");

  const handleGenerateShortLink = (event) => {
    event.preventDefault();
  };
  return (
    <div
      style={{
        background: 'url("/background.webp")',
      }}
      className="flex flex-col items-center justify-center gap-5 h-screen"
    >
      <div className="w-2/3 flex flex-col gap-10">
        {/* Header */}
        <section className="flex flex-col">
          <h1 className="text-5xl text-primary">Free URL Shortener</h1>
          <p className="text-slate-700">
            Create short & memorable links in seconds.
          </p>
        </section>

        {/* Input Form */}
        <form
          onSubmit={handleGenerateShortLink}
          className="flex gap-5 items-center"
        >
          <Input
            type="name"
            className="text-lg"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit">Generate</Button>
        </form>

        {/* Shortened Link */}
        <section className="invisible	flex items-center justify-between gap-5 rounded-lg border border-primary p-3">
          <p className="text-slate-700 flex-1 truncate">Actual Link</p>
          <div className="flex items-center gap-5">
            <Button
              variant="link"
              onClick={() => router.push("/")}
              className="text-slate-700 truncate w-96"
            >
              https://example.com
            </Button>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => {
                    copyToClipboard("https://example.com");
                    toast.success("Copied!");
                  }}
                  className="cursor-pointer"
                >
                  Copy
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to copy the link!</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </section>
      </div>
      <Toaster />
    </div>
  );
}
