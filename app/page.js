"use client";
import { useEffect, useState } from "react";
import { copyToClipboard, removeProtocol } from "@/lib/utils";
import toast, { Toaster } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { handleGenerateURL, showAllURLs } from "@/apis/url";
import { Button, Input } from "@/components/ui";
import Link from "next/link";
import { LoginModal, SignupModal } from "@/components/Block";

const Entry = ({ slug, originalUrl }) => {
  const shortUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/${slug}`;
  return (
    <section className="flex items-center justify-between gap-5 rounded-lg border border-primary p-3 bg-white">
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
  const [url, setUrl] = useState("");
  const [allURLs, setAllURLs] = useState([]);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const { isLoading, mutate } = useMutation(() => handleGenerateURL(url), {
    onSuccess: () => {
      showAllURLs(setAllURLs);
      setUrl("");
    },
    onError: (error) => toast.error(error.message),
  });

  useEffect(() => {
    showAllURLs(setAllURLs);
  }, []);

  const handleGenerateShortLink = (event) => {
    event.preventDefault();
    mutate();
  };

  return (
    <div
      className="min-h-screen bg-cover bg-no-repeat px-4 sm:px-20 py-8"
      style={{ backgroundImage: 'url("/background.webp")' }}
    >
      <nav className="w-full flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-700">Shorty</h1>
        <div className="flex items-center gap-4">
          <Button
            variant="destructive"
            className="hover:bg-red-600"
            onClick={() => setIsSignupModalOpen(true)}
          >
            Sign Up
          </Button>
          <Button
            className="bg-gray-800 hover:bg-black"
            onClick={() => setIsLoginModalOpen(true)}
          >
            Login
          </Button>
        </div>
      </nav>

      <main className="flex flex-col items-center justify-center flex-1">
        <section className="my-8">
          <h2 className="text-5xl font-bold text-gray-800">
            Free URL Shortener
          </h2>
          <p className="text-gray-600 mt-3">
            Create short & memorable links in seconds.
          </p>
        </section>

        <form
          onSubmit={handleGenerateShortLink}
          className="w-full max-w-4xl flex gap-4 mb-8"
        >
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://www.example.com"
            className="flex-1 px-4 py-2 border rounded-lg text-lg border-gray-300 focus:ring-blue-500 focus:border-blue-500"
          />
          <Button
            type="submit"
            disabled={isLoading}
            variant="secondary"
            // className="px-6 py-2 bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isLoading ? "Generating..." : "Generate"}
          </Button>
        </form>

        <div className="w-full max-w-4xl overflow-auto h-96 gap-5 flex flex-col">
          {allURLs?.map((entry) => (
            <Entry
              key={entry._id}
              originalUrl={entry.redirectURL}
              slug={entry.slug}
            />
          ))}
        </div>
      </main>

      <SignupModal isOpen={isSignupModalOpen} onClose={setIsSignupModalOpen} />
      <LoginModal isOpen={isLoginModalOpen} onClose={setIsLoginModalOpen} />
      <Toaster />
    </div>
  );
}
