import { useEffect, useState } from "react";
import QuoteCard from "./components/QuoteCard";
import LikedQuotes from "./components/LikedQuotes";
import "./App.css";

function App() {

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ localStorage init (SAFE)
  const [likedQuotes, setLikedQuotes] = useState(() => {
    try {
      const stored = localStorage.getItem("likedQuotes");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ✅ save to localStorage
  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  // ✅ FETCH QUOTE (WORKING API)
  const fetchQuote = async () => {
    setLoading(true);

    try {
      // 🔥 using working API (no SSL issue)
      const res = await fetch("https://dummyjson.com/quotes/random");

      const data = await res.json();

      setQuote(data.quote);
      setAuthor(data.author);

    } catch (err) {
      console.error("API error:", err);
      setQuote("Failed to load quote 😢");
      setAuthor("");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

  // ❤️ LIKE
  const toggleLike = () => {
    if (!quote) return;

    const exists = likedQuotes.find(q => q.quote === quote);

    if (exists) {
      setLikedQuotes(prev => prev.filter(q => q.quote !== quote));
    } else {
      setLikedQuotes(prev => [
        ...prev,
        { id: Date.now(), quote, author }
      ]);
    }
  };

  // ❌ REMOVE
  const removeQuote = (id) => {
    setLikedQuotes(prev => prev.filter(q => q.id !== id));
  };

  const isLiked = likedQuotes.some(q => q.quote === quote);

  return (
    <div className="appWrapper">

      {/* 🌌 particles */}
      <div className="particles"></div>

      <div className="container">
        <h1>Motivational Dashboard</h1>

        <QuoteCard
          quote={quote}
          author={author}
          loading={loading}
          fetchQuote={fetchQuote}
          toggleLike={toggleLike}
          isLiked={isLiked}
        />

        <h3>Total Likes ❤️: {likedQuotes.length}</h3>

        <LikedQuotes
          likedQuotes={likedQuotes}
          removeQuote={removeQuote}
        />
      </div>

    </div>
  );
}

export default App;