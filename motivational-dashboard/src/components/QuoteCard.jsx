import { useState } from "react";

function QuoteCard({ quote, author, loading, fetchQuote, toggleLike, isLiked }) {

  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(`${quote} - ${author}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="quoteCard">

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <p className="quoteText">“{quote}”</p>
          <p className="author">— {author}</p>
        </>
      )}

      <div>
        <button onClick={fetchQuote} disabled={loading}>
          New Quote
        </button>

        {}
        <button
          className={`likeBtn ${isLiked ? "liked" : ""}`}
          onClick={toggleLike}
        >
          {isLiked ? "❤️ Liked" : "🤍 Like"}
        </button>

        

        {}
        <button onClick={handleCopy}>
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>

    </div>
  );
}

export default QuoteCard;