import { produce } from "immer";

const newComment = (comment) => {
  return {
    id: crypto.randomUUID(),
    comment,
    subComments: [],
  };
};

export const addReplyUtil = (comments, id, comment) => {
  return produce(comments, (draft) => {
    const dfs = (parentComment) => {
      if (parentComment.id === id) {
        parentComment.subComments.unshift(newComment(comment));
        return true;
      }
      for (let i = 0; i < parentComment.subComments.length; i++) {
        if (dfs(parentComment.subComments[i])) return;
      }
      return false;
    };

    // if the comment is on the top level
    if (id === null) {
      draft.unshift(newComment(comment));
      return;
    }

    for (let i = 0; i < draft.length; i++) {
      if (dfs(draft[i])) {
        break;
      }
    }
  });
};

// export const addReplyUtil = (comments, id, comment) => {
//   const dfs = (parentComment) => {
//     if (parentComment.id === id) {
//       parentComment.subComments = [
//         { id: crypto.randomUUID(), comment, subComments: [] },
//         ...parentComment.subComments,
//       ];
//       return true;
//     }
//     for (let i = 0; i < parentComment.subComments.length; i++) {
//       if (dfs(parentComment.subComments[i])) return;
//     }
//     return false;
//   };

//   for (let i = 0; i < comments.length; i++) {
//     if (dfs(comments[i])) {
//       break;
//     }
//   }
//   console.log(comments);
// };
