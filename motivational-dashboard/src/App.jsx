import { useEffect, useState } from "react";
import QuoteCard from "./components/QuoteCard";
import LikedQuotes from "./components/LikedQuotes";
import "./App.css";

function App() {

  const quotesData = [
    { content: "Push yourself, because no one else is going to do it for you.", author: "Unknown" },
    { content: "Dream it. Wish it. Do it.", author: "Unknown" },
    { content: "Success doesn’t just find you. You have to go out and get it.", author: "Unknown" },
    { content: "Stay positive, work hard, make it happen.", author: "Unknown" },
    { content: "Don’t stop until you’re proud.", author: "Unknown" }
  ];

  const [quote, setQuote] = useState("");
  const [author, setAuthor] = useState("");
  const [loading, setLoading] = useState(false);

  // ✅ FIX: initialize from localStorage directly
  const [likedQuotes, setLikedQuotes] = useState(() => {
    try {
      const stored = localStorage.getItem("likedQuotes");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // ✅ SAVE always
  useEffect(() => {
    localStorage.setItem("likedQuotes", JSON.stringify(likedQuotes));
  }, [likedQuotes]);

  const fetchQuote = () => {
    setLoading(true);

    setTimeout(() => {
      const random = quotesData[Math.floor(Math.random() * quotesData.length)];
      setQuote(random.content);
      setAuthor(random.author);
      setLoading(false);
    }, 300);
  };

  useEffect(() => {
    fetchQuote();
  }, []);

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

  const removeQuote = (id) => {
    setLikedQuotes(prev => prev.filter(q => q.id !== id));
  };

  const isLiked = likedQuotes.some(q => q.quote === quote);

  return (
    <div className="appWrapper">
      <div className="particles"></div> {/* 🌟 IMPORTANT */}

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