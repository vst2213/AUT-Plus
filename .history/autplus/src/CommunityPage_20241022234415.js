import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHome, FaCommentDots, FaCalendarAlt, FaBars } from "react-icons/fa";
import "./CommunityPage.css";
import { useReports } from "./ReportContext"; // Report context import

const CommunityPage = () => {
  const { addReport } = useReports();
  const [post, setPost] = useState("");
  const [userName, setUserName] = useState("");
  const [points, setPoints] = useState(0); // 포인트 상태 관리
  const [darkMode, setDarkMode] = useState(false);
  const [reportedPosts, setReportedPosts] = useState(new Set());
  const [replyInputs, setReplyInputs] = useState({});
  const [posts, setPosts] = useState([]);

  // 초기 로딩 시 사용자 정보와 게시물 및 포인트 불러오기
  useEffect(() => {
    const savedFirstName = localStorage.getItem("firstName") || "";
    const savedLastName = localStorage.getItem("lastName") || "";
    setUserName(`${savedFirstName} ${savedLastName}`.trim());

    const savedDarkMode = localStorage.getItem("darkMode") === "true";
    setDarkMode(savedDarkMode);

    const savedPosts = JSON.parse(localStorage.getItem("communityPosts")) || [];
    setPosts(savedPosts);

    const savedPoints = parseInt(localStorage.getItem("points")) || 0;
    setPoints(savedPoints);
  }, []);

  const savePostsToLocalStorage = (newPosts) => {
    localStorage.setItem("communityPosts", JSON.stringify(newPosts));
  };

  const savePointsToLocalStorage = (newPoints) => {
    localStorage.setItem("points", newPoints);
    setPoints(newPoints);
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

  const handleReplySubmit = (postId, postUser) => {
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

    if (postUser !== userName) {
      const newPoints = points + 10;
      savePointsToLocalStorage(newPoints);
      alert(`You earned 10 points! Total points: ${newPoints}`);
    }
  };

  const handleDeletePost = (postId) => {
    const updatedPosts = posts.filter((p) => p.id !== postId);
    setPosts(updatedPosts);
    savePostsToLocalStorage(updatedPosts);
  };

  const handleReport = (user, content, postId) => {
    addReport(user, content);
    setReportedPosts((prev) => new Set(prev).add(postId)); // Track reported posts
    alert(`${user} has been reported.`);
  };

  return (
    <div className={`community-container ${darkMode ? "dark-mode" : ""}`}>
      {/* Header */}
      <div className="header">
        <div className="left-header">
          <img src="/pictures/aut.jpeg" alt="AUT Logo" className="logo" />
        </div>
      </div>

      {/* Top Navigation */}
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

      {/* Actions */}
      <div className="actions">
        <Link to="/home">
          <button className="round-button AUT">AUT</button>
        </Link>
        <Link to="/clubs">
          <button className="round-button clubs">Clubs</button>
        </Link>
      </div>

      {/* Post Form */}
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

      {/* Posts Section */}
      <div className="posts-section">
        <h2>Community Posts</h2>
        {posts.map((p) => (
          <div key={p.id} className="post">
            <div className="post-header">
              <strong>{p.user}</strong> <small>2 hours ago</small>
            </div>
            <p>{p.content}</p>

            {/* Replies Section */}
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
                onClick={() => handleReplySubmit(p.id, p.user)}
              >
                Reply
              </button>
            </div>

            {/* Delete and Report Buttons */}
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
              onClick={() => handleReport(p.user, p.content, p.id)}
              disabled={reportedPosts.has(p.id)} // Disable if reported
            >
              {reportedPosts.has(p.id) ? "Reported" : "Report"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
