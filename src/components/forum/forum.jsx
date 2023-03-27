import React, { useState, useCallback } from "react";
import "./forum.css";

const Forum = () => {
  const [comments, setComments] = useState([]);

  const handleCommentSubmit = useCallback((username, commentText) => {
    setComments((prevComments) => {
      const newComment = {
        id: Math.random(),
        user: username,
        text: commentText,
        hidden: false,
        replies: [],
      };
      return [...prevComments, newComment];
    });
  }, []);

  const handleCommentDelete = useCallback((commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, hidden: true } : comment
      )
    );
  }, []);

  const handleCommentEdit = useCallback((commentId, newText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId ? { ...comment, text: newText } : comment
      )
    );
  }, []);

  const handleCommentHide = useCallback((commentId) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, hidden: !comment.hidden }
          : comment
      )
    );
  }, []);

  const visibleComments = comments.filter((comment) => !comment.hidden);

  return (
    <div>
      <CommentForm onCommentSubmit={handleCommentSubmit} />
      {visibleComments.map((comment) => (
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
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "username") {
      setUsername(value);
} else if (name === "commentText") {
setCommentText(value);
}
};

return (
<form onSubmit={handleSubmit}>
<label>
Name:
<input
       type="text"
       name="username"
       value={username}
       onChange={handleChange}
     />
</label>
<br />
<label>
Comment:
<textarea
       name="commentText"
       value={commentText}
       onChange={handleChange}
     />
</label>
<br />
<button type="submit">Submit</button>
</form>
);
};

const Comment = ({
  comment,
  onCommentDelete,
  onCommentEdit,
  onCommentHide,
  onReplySubmit,
  onReplyChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedCommentText, setEditedCommentText] = useState(comment.text);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState("");
  const [replyUser, setReplyUser] = useState("");

  const handleEditSubmit = (event) => {
    event.preventDefault();
    onCommentEdit(comment.id, editedCommentText);
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedCommentText(comment.text);
  };

  const handleDelete = () => {
    onCommentDelete(comment.id);
  };

  const handleHide = () => {
    onCommentHide(comment.id);
  };

  const handleReplySubmit = (event) => {
    event.preventDefault();
    const newReply = {
      id: Math.random(),
      user: "Anonymous",
      text: replyText,
    };

    setComments((prevComments) =>
      prevComments.map((prevComment) =>
        prevComment.id === comment.id
          ? { ...prevComment, replies: [...prevComment.replies, newReply] }
          : prevComment
      )
    );
  };

  return (
    <div>
      <p>
        {comment.user} said:{" "}
        {isEditing ? (
          <input
            type="text"
            value={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
          />
        ) : (
          comment.text
        )}
      </p>
      <button onClick={handleHide}>{comment.hidden ? "Show" : "Hide"}</button>
      <button onClick={handleDelete}>Delete</button>
      <button onClick={() => setIsEditing(true)}>Edit</button>
      {isEditing && (
        <form onSubmit={handleEditSubmit}>
          <textarea
            value={editedCommentText}
            onChange={(e) => setEditedCommentText(e.target.value)}
          ></textarea>
          <button type="submit">Save</button>
          <button type="button" onClick={handleEditCancel}>
            Cancel
          </button>
        </form>
      )}
      {comment.replies.map((reply) => (
        <div key={reply.id}>
          <p>
            {reply.user} replied: {reply.text}
          </p>
        </div>
      ))}
      <form onSubmit={handleReplySubmit}>
        <label>
          Reply:
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
          ></textarea>
        </label>
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};


export default Forum;