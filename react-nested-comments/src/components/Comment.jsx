import { useState } from "react";

const Comment = ({ comment, reply }) => {
  const [showReplies, setShowReplies] = useState(false);
  const [addReply, setAddReply] = useState(false);
  const [replyText, setReplyText] = useState("");

  const handleAddReply = (e) => {
    e.preventDefault();
    reply(comment.id, replyText);
    resetShowReply();
  };

  const resetShowReply = () => {
    setReplyText("");
    setAddReply(false);
  };

  return (
    <div className="border-black border p-4 rounded-md">
      <div key={comment.id} className="flex justify-between items-center mb-2">
        <p>{comment.comment}</p>
        <div className="space-x-2 text-blue-500 text-sm">
          {comment.subComments.length > 0 && (
            <button onClick={() => setShowReplies(!showReplies)}>
              {showReplies ? "Hide Replies" : "View Replies"}
            </button>
          )}
          <button onClick={() => setAddReply(!addReply)}>Add Reply</button>
        </div>
      </div>
      {addReply && (
        <div className="pl-4 my-2">
          <form onSubmit={handleAddReply}>
            <input
              type="text"
              className="w-full mb-2 border-black border outline-none px-2 py-1 rounded-md"
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              autoFocus
            />
            <div className="flex gap-4">
              <button className="px-4 py-2 bg-purple-500 rounded-md text-white">
                Reply
              </button>
              <button
                type="button"
                className="px-4 py-2 bg-rose-500 rounded-md text-white"
                onClick={resetShowReply}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}
      {comment.subComments.length > 0 && showReplies && (
        <div className="pl-4 space-y-2">
          {comment.subComments.map((subComment) => {
            return (
              <Comment key={subComment.id} comment={subComment} reply={reply} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Comment;
