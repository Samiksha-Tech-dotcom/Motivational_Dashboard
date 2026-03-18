function LikedQuotes({ likedQuotes, removeQuote }) {
  return (
    <div className="likedList">
      <h3>Liked Quotes</h3>

      {likedQuotes.length === 0 && <p>No liked quotes yet.</p>}

      {likedQuotes.map((q) => (
        <div key={q.id} className="likedItem">
          <div>
            <p>“{q.quote}”</p>
            <small>— {q.author}</small>
          </div>

          {}
          <button
            className="removeBtn"
            onClick={() => removeQuote(q.id)}
          >
            ✖
          </button>
        </div>
      ))}
    </div>
  );
}

export default LikedQuotes;