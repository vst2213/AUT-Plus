import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./CommunityPage.css";
import { useReports } from "./ReportContext"; // Report context import

const CommunityPage = () => {
  const { addReport, reports } = useReports();
  const [post, setPost] = useState("");
  const [userName, setUserName] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const [isReported, setIsReported] = useState(false);
  const [replyInputs, setReplyInputs] = useState({});
  const [posts, setPosts] = useState([]);

  // MyDetails에서 사용자 이름 가져오기 및 게시물 로드
  useEffect(() => {
    const savedFirstName = localStorage.getItem("firstName") || "";
    const savedLastName = localStorage.getItem("lastName") || "";
    setUserName(`${savedFirstName} ${savedLastName}`.trim());

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    const savedPosts = JSON.parse(localStorage.getItem("communityPosts")) || [];
    setPosts(savedPosts);
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("darkMode", newMode);
  };

  const savePostsToLocalStorage = (newPosts) => {
    localStorage.setItem("communityPosts", JSON.stringify(newPosts));
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    if (!post.trim()) {
      alert("Please write something to post.");
      return;
    }

    const newPost = {
      id: posts.length + 1,
      user: userName,
      content: post.trim(),
      replies: [],
    };

    const updatedPosts = [...posts, newPost];
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
    setPost("");
  };

  const handleReplyChange = (postId, value) => {
    setReplyInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleReplySubmit = (postId) => {
    const replyContent = replyInputs[postId]?.trim();
    if (!replyContent) return;

    const updatedPosts = posts.map((p) =>
      p.id === postId
        ? { ...p, replies: [...p.replies, { user: userName, content: replyContent }] }
        : p
    );

    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
    setReplyInputs((prev) => ({ ...prev, [postId]: "" }));
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const handleReport = (user, content) => {
    addReport(user, content);
    setIsReported(true);
    setTimeout(() => {
      alert(`${user} has been reported.`);
      setIsReported(false);
    }, 500);
  };

  return (
    <div className={`community-container ${darkMode ? "dark-mode" : ""}`}>
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
      </div>

      <div className="top-nav">
        <Link to="/home">
          <FaHome className="nav-icon" />
        </Link>
        <Link to="/community">
          <FaCommentDots className="nav-icon" />
        </Link>
        <Link to="/calendar">
          <FaCalendarAlt className="nav-icon" />
        </Link>
        <Link to="/more">
          <FaBars className="nav-icon" />
        </Link>
      </div>

      <div className="actions">
        <Link to="/home">
          <button className="round-button AUT">AUT</button>
        </Link>
        <Link to="/clubs">
          <button className="round-button clubs">Clubs</button>
        </Link>
      </div>

      <form className="post-form" onSubmit={handlePostSubmit}>
        <input
          type="text"
          className="post-input"
          placeholder={`What's on your mind, ${userName}?`}
          value={post}
          onChange={(e) => setPost(e.target.value)}
        />
        <button type="submit" className="post-submit">
          Post
        </button>
      </form>

      <div className="posts-section">
        <h2>Community Posts</h2>
        {posts.map((p) => (
          <div key={p.id} className="post">
            <div className="post-header">
              <strong>{p.user}</strong> <small>2 hours ago</small>
            </div>
            <p>{p.content}</p>

            <div className="replies-section">
              <h4>Replies:</h4>
              {p.replies.length > 0 ? (
                p.replies.map((reply, index) => (
                  <p key={index} className="reply">
                    <strong>{reply.user}: </strong>
                    {reply.content}
                  </p>
                ))
              ) : (
                <p>No replies yet.</p>
              )}

              <input
                type="text"
                className="reply-input"
                placeholder={`Reply as ${userName}`}
                value={replyInputs[p.id] || ""}
                onChange={(e) => handleReplyChange(p.id, e.target.value)}
              />
              <button
                className="reply-submit"
                onClick={() => handleReplySubmit(p.id)}
              >
                Reply
              </button>
            </div>

            {/* 본인 게시물일 때만 삭제 버튼 표시 */}
            {p.user === userName && (
              <button
                className="delete-button"
                onClick={() => handleDeletePost(p.id)}
              >
                Delete
              </button>
            )}

            <button
              className="report-button"
              onClick={() => handleReport(p.user, p.content)}
              disabled={isReported}
            >
              {isReported ? "Reported" : "Report"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;