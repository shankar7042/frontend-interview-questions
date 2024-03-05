import { useState } from "react";
import Comment from "./components/Comment";
import data from "./data/comments";
import { addReplyUtil } from "./utils";

function App() {
  const [comments, setComments] = useState(data);
  const [text, setText] = useState("");

  const addReply = (id, comment) => {
    setComments(addReplyUtil(comments, id, comment));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text) return;
    addReply(null, text);
    setText("");
  };

  return (
    <div className="p-4 space-y-4 max-w-[50rem] mx-auto border mt-2">
      <div className="my-4">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="w-full mb-2 border-black border outline-none px-2 py-1 rounded-md"
            autoFocus
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button className="px-4 py-2 bg-purple-500 rounded-md text-white">
            Reply
          </button>
        </form>
      </div>
      {comments.length > 0 &&
        comments.map((comment) => {
          return (
            <Comment key={comment.id} comment={comment} reply={addReply} />
          );
        })}
    </div>
  );
}

export default App;
