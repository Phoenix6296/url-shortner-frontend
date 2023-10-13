"use client";

import { useState } from "react";
import { copyToClipboard } from "@/lib/utils";
import { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import { handleGenerateURL } from "@/apis/url";
import { Button, Input } from "@/components/ui";

export default function Home() {
  //Variables
  const router = useRouter();
  const [url, setUrl] = useState("");

  //APIs
  const { isLoading, mutate } = useMutation(() => handleGenerateURL(url));

  //Functions
  const handleGenerateShortLink = (event) => {
    event.preventDefault();
    mutate();
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
            placeholder="https://www.example.com"
            onChange={(e) => setUrl(e.target.value)}
          />
          <Button type="submit" disabled={isLoading}>
            Generate
          </Button>
        </form>

        {/* Shortened Link */}
        <section className="flex items-center justify-between gap-5 rounded-lg border border-primary p-3">
          <p className="text-slate-700 flex-1 truncate">Actual Link</p>
          <div className="flex items-center gap-5">
            <Button
              variant="link"
              onClick={() => router.push("/")}
              className="text-slate-700 truncate w-96"
            >
              https://example.com
            </Button>
            <Button variant="ghost" onClick={() => copyToClipboard(url)}>
              Copy
            </Button>
          </div>
        </section>
      </div>
      <Toaster />
    </div>
  );
}
