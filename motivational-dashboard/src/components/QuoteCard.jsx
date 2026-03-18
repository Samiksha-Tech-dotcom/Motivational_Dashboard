import { useState } from "react";

function QuoteCard({ quote, author, loading, fetchQuote, toggleLike, isLiked }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    if (!quote) return;

    navigator.clipboard.writeText(`${quote} - ${author}`);
    setCopied(true);

    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="quoteCard">
      <p className="quoteText">
        {loading ? "Loading..." : `“${quote}”`}
      </p>

      <h4 className="author">{author && `- ${author}`}</h4>

      <div className="btnGroup">
        <button onClick={fetchQuote} disabled={loading}>
          {loading ? "Loading..." : "New Quote"}
        </button>

        <button
          className={`likeBtn ${isLiked ? "liked" : ""}`}
          onClick={toggleLike}
        >
          ❤️
        </button>

        <button onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}

export default QuoteCard;