"use client";

import { useEffect, useState } from "react";
import { copyToClipboard, removeProtocol } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { handleGenerateURL, showAllURLs } from "@/apis/url";
import { Button, Input } from "@/components/ui";
import Link from "next/link";

const Entry = ({ slug, originalUrl }) => {
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;
  return (
    <section className="flex items-center justify-between gap-5 rounded-lg border border-primary p-3">
      <div className="flex-1">
        <Link
          href={originalUrl}
          target="_blank"
          className="text-slate-700 truncate w-96 text-md hover:underline"
        >
          {removeProtocol(originalUrl) || "Original URL"}
        </Link>
      </div>
      <div className="flex items-center gap-5">
        <div className="w-96">
          <Link
            href={shortUrl}
            target="_blank"
            className="text-slate-700 truncate text-md hover:underline"
          >
            {shortUrl || "Short URL"}
          </Link>
        </div>
        <Button
          variant="ghost"
          onClick={() => copyToClipboard(shortUrl, "Copied the short URL")}
        >
          Copy
        </Button>
      </div>
    </section>
  );
};

export default function Home() {
  //Variables
  const [url, setUrl] = useState("");
  const [allURLs, setAllURLs] = useState([]);

  //APIs
  const { isLoading, mutate } = useMutation(() => handleGenerateURL(url), {
    onSuccess: () => {
      showAllURLs(setAllURLs), setUrl("");
    },
    onError: (error) => toast.error(error.message),
  });

  //UseEffects
  useEffect(() => {
    showAllURLs(setAllURLs);
  }, []);

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
      <div className="lg:w-2/3 w-full lg:px-0 px-10 flex flex-col gap-10 h-[70%] overflow-hidden">
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
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </form>

        {/* Shortened Link */}
        <div className="flex flex-col overflow-scroll gap-5">
          {allURLs?.map((entry) => (
            <Entry
              key={entry._id}
              originalUrl={entry.redirectURL}
              slug={entry.slug}
            />
          ))}
        </div>
      </div>
      <Toaster />
    </div>
  );
}
