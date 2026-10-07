import React, { useState } from "react";
import axios from "axios";
import QRCode from "react-qr-code";
import QRCodeGenerator from "qrcode";

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [copied, setCopied] = useState(false);
  const [qrImage, setQrImage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleShorten = async () => {
    if (!url.trim()) return;

    try {
      setLoading(true);

      const response = await axios.post(`${API_BASE_URL}/shorten`, {
        originalUrl: url,
      });

      const newShortUrl = response.data.shortUrl;

      setShortUrl(newShortUrl);
      setCopied(false);

      const qr = await QRCodeGenerator.toDataURL(newShortUrl);
      setQrImage(qr);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shortUrl);
      setCopied(true);

      setTimeout(() => {
        setCopied(false);
      }, 2000);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#070711] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute -left-32 -top-32 h-96 w-96 rounded-full bg-violet-600/20 blur-[120px]" />

      <div className="pointer-events-none absolute -bottom-32 -right-32 h-96 w-96 rounded-full bg-cyan-500/20 blur-[120px]" />

      {/* Grid background */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* Main content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-5xl flex-col items-center px-5 py-10 sm:px-8">
        {/* Header */}
        <header className="mb-14 text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400"></span>
            Fast & Secure URL Shortener
          </div>

          <h1 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
            Make your links
            <span className="block bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent">
              short & simple.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-gray-400 sm:text-lg">
            Transform long URLs into clean, shareable links in seconds. Generate
            a QR code and share your link anywhere.
          </p>
        </header>

        {/* URL Input Section */}
        <section className="w-full max-w-3xl">
          <div className="rounded-3xl border border-white/10 bg-white/[0.05] p-4 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-6">
            <div className="rounded-2xl border border-white/10 bg-black/20 p-2 transition-all duration-300 focus-within:border-violet-500/50 focus-within:ring-4 focus-within:ring-violet-500/10">
              <div className="flex flex-col gap-2 sm:flex-row">
                {/* Input */}
                <div className="flex flex-1 items-center">
                  <svg
                    className="ml-3 mr-2 h-5 w-5 shrink-0 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
                    />
                  </svg>

                  <input
                    type="url"
                    placeholder="Paste your long URL here..."
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleShorten();
                      }
                    }}
                    className="w-full bg-transparent px-2 py-3 text-sm text-white outline-none placeholder:text-gray-600 sm:text-base"
                  />
                </div>

                {/* Shorten Button */}
                <button
                  onClick={handleShorten}
                  disabled={loading}
                  className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 px-7 py-3 font-semibold transition-all duration-300 hover:scale-[1.02] hover:from-violet-500 hover:to-fuchsia-500 hover:shadow-lg hover:shadow-violet-500/25 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></span>
                      Creating...
                    </span>
                  ) : (
                    "Shorten URL"
                  )}
                </button>
              </div>
            </div>

            <p className="mt-3 px-2 text-xs text-gray-500">
              Press Enter to quickly shorten your URL
            </p>
          </div>

          {/* Result */}
          {shortUrl && (
            <div className="mt-6 animate-[fadeIn_0.5s_ease-out]">
              <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.05] shadow-2xl shadow-black/30 backdrop-blur-2xl">
                {/* Result Header */}
                <div className="border-b border-white/10 px-6 py-5 sm:px-8">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10">
                      <svg
                        className="h-5 w-5 text-emerald-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>

                    <div>
                      <h2 className="font-semibold">Your link is ready</h2>

                      <p className="text-xs text-gray-500">Share it anywhere</p>
                    </div>
                  </div>
                </div>

                {/* Result Body */}
                <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_auto]">
                  {/* Short URL */}
                  <div className="flex flex-col justify-center">
                    <p className="mb-2 text-xs font-medium uppercase tracking-wider text-gray-500">
                      Short URL
                    </p>

                    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="break-all text-sm font-medium text-violet-400 transition-colors hover:text-violet-300 sm:text-base"
                      >
                        {shortUrl}
                      </a>
                    </div>

                    {/* Buttons */}
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <button
                        onClick={handleCopy}
                        className={`rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
                          copied
                            ? "bg-emerald-500 text-white"
                            : "bg-white/10 text-white hover:bg-white/15"
                        }`}
                      >
                        {copied ? "✓ Copied" : "Copy link"}
                      </button>

                      <a
                        href={shortUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-xl bg-violet-600 px-4 py-3 text-center text-sm font-semibold transition-all duration-300 hover:bg-violet-500"
                      >
                        Open link
                      </a>
                    </div>
                  </div>

                  {/* QR Code */}
                  <div className="flex flex-col items-center">
                    <p className="mb-3 text-xs font-medium uppercase tracking-wider text-gray-500">
                      QR Code
                    </p>

                    <div className="rounded-2xl bg-white p-4 shadow-xl">
                      <QRCode value={shortUrl} size={160} />
                    </div>

                    {qrImage && (
                      <a
                        href={qrImage}
                        download="qr-code.png"
                        className="mt-4 rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-medium text-gray-300 transition-all duration-300 hover:bg-white/10 hover:text-white"
                      >
                        ↓ Download QR
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Features */}
        <div className="mt-16 grid w-full max-w-3xl gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
            <div className="mb-3 text-2xl">⚡</div>

            <h3 className="text-sm font-semibold">Lightning Fast</h3>

            <p className="mt-1 text-xs text-gray-500">
              Create short links instantly
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
            <div className="mb-3 text-2xl">🔒</div>

            <h3 className="text-sm font-semibold">Secure</h3>

            <p className="mt-1 text-xs text-gray-500">
              Your links stay protected
            </p>
          </div>

          <div className="rounded-2xl border border-white/5 bg-white/[0.03] p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.06]">
            <div className="mb-3 text-2xl">▦</div>

            <h3 className="text-sm font-semibold">QR Codes</h3>

            <p className="mt-1 text-xs text-gray-500">Share links through QR</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-auto pt-16 text-center text-xs text-gray-600">
          Built with React • Fast • Simple • Open
        </footer>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </main>
  );
};

export default App;
