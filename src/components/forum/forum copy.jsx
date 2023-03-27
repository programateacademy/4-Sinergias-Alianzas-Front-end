import React, { useState } from "react";
// import "./forum.css";
const Forum = () => {
  const [comments, setComments] = useState([]);

const handleCommentSubmit = (username, commentText) => {
  const newComment = {
    id: comments.length + 1,
    user: username,
    text: commentText,
    hidden: false,
    replies: [],
  };
  setComments([...comments, newComment]);
};

  const handleCommentDelete = (commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, hidden: true } : comment
    );
    setComments(updatedComments);
  };

  const handleCommentEdit = (commentId, newText) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, text: newText } : comment
    );
    setComments(updatedComments);
  };

  const handleCommentHide = (commentId) => {
    const updatedComments = comments.map((comment) =>
      comment.id === commentId ? { ...comment, hidden: !comment.hidden } : comment
    );
    setComments(updatedComments);
  };

  return (
    <div>
      <CommentForm onCommentSubmit={handleCommentSubmit} />
      {comments.map((comment) => (
        <Comment
          key={comment.id}
          comment={comment}
          onCommentDelete={handleCommentDelete}
          onCommentEdit={handleCommentEdit}
          onCommentHide={handleCommentHide}
        />
      ))}
    </div>
  );
};

const CommentForm = ({ onCommentSubmit }) => {
  const [commentText, setCommentText] = useState("");
  const [username, setUsername] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    onCommentSubmit(username, commentText);
    setCommentText("");
       setUsername("");
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre de usuario:
        <input type="text" value={username} onChange={handleUsernameChange} />
      </label>
      <br />
      <textarea value={commentText} onChange={handleCommentChange} />
      <button type="submit">Publicar comentario</button>
    </form>
  );
};

const Comment = ({ comment, onCommentDelete, onCommentEdit, onCommentHide }) => {
  const [replyText, setReplyText] = useState("");
  const [replies, setReplies] = useState([]);

  const handleReplySubmit = (event) => {
    event.preventDefault();
    setReplies([...replies, replyText]);
    setReplyText("");
  };

  const handleReplyChange = (event) => {
    setReplyText(event.target.value);
  };

  return (
    !comment.hidden && (
      <div className="comment">
        <h4>{comment.user}</h4>
        <p>{comment.text}</p>
        <button onClick={() => onCommentHide(comment.id)}>
          {comment.hidden ? "Mostrar" : "Ocultar"}
        </button>
        <button onClick={() => onCommentEdit(comment.id, "Texto editado")}>
          Editar
        </button>
        <button onClick={() => onCommentDelete(comment.id)}>Eliminar</button>
        <form onSubmit={handleReplySubmit}>
          <textarea value={replyText} onChange={handleReplyChange} />
          <button type="submit">Responder</button>
        </form>
        {comment.replies &&
          comment.replies.map((reply, index) => (
            <div className="reply" key={index}>
              <h4>{comment.user}</h4>
              <p>{reply}</p>
            </div>
          ))}
      </div>
    )
  );
};
export default Forum;