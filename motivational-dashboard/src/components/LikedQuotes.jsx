import { useRef } from "react";

function LikedQuotes({ likedQuotes, removeQuote }) {
  return (
    <div className="likedContainer">
      <h2>Liked Quotes</h2>

      {likedQuotes.length === 0 ? (
        <p>No liked quotes yet 😔</p>
      ) : (
        likedQuotes.map((q) => (
          <SwipeCard
            key={q.id}
            id={q.id}              // ✅ PASS ID
            quote={q.quote}
            author={q.author}
            removeQuote={removeQuote}
          />
        ))
      )}
    </div>
  );
}

function SwipeCard({ id, quote, author, removeQuote }) {
  const cardRef = useRef(null);
  let startX = 0;

  const handleTouchStart = (e) => {
    startX = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    const moveX = e.touches[0].clientX - startX;

    if (moveX < 0 && cardRef.current) {
      cardRef.current.style.transform = `translateX(${moveX}px)`;
    }
  };

  const handleTouchEnd = (e) => {
    const endX = e.changedTouches[0].clientX;
    const diff = startX - endX;

    if (diff > 100) {
      cardRef.current.style.transform = "translateX(-120%)";

      setTimeout(() => {
        removeQuote(id); // ✅ USE ID
      }, 200);
    } else {
      cardRef.current.style.transform = "translateX(0)";
    }
  };

  return (
    <div
      ref={cardRef}
      className="likedCard swipeCard"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <p>“{quote}”</p>
      <span>- {author}</span>

      {/* ✅ REMOVE BUTTON FIX */}
      <button
        onClick={() => removeQuote(id)}
        style={{
          marginTop: "10px",
          background: "red",
          color: "white",
          border: "none",
          padding: "5px 10px",
          borderRadius: "6px",
          cursor: "pointer"
        }}
      >
        Remove
      </button>
    </div>
  );
}

export default LikedQuotes;