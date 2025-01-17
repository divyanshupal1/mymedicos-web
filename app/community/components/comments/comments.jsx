"use client"
import React, { useState } from "react";

// Sample comments array
const comments = [
  {
    id: "p1",
    parent: null,
    body: "this is parent1 comment",
  },
  {
    id: "p2",
    parent: null,
    body: "Parent 2 comment",
  },
  {
    id: "p3",
    parent: null,
    body: "Parent 3 comment",
  },
  {
    id: "c1",
    parent: "p1",
    body: "Reply to parent 1",
  },
  {
    id: "c2",
    parent: "p1",
    body: "second Reply to parent 1",
  },
  {
    id: "cc1",
    parent: "c1",
    body: "reply to child comment",
  },
  {
    id: "ccc1",
    parent: "cc1",
    body: "reply to grand child",
  },
];

// Function to structure comments as a tree
const buildCommentTree = (comments, parentId = null) => {
  return comments
    .filter((comment) => comment.parent === parentId)
    .map((comment) => ({
      ...comment,
      children: buildCommentTree(comments, comment.id),
    }));
};

const Comment = ({
  comment,
}) => {
  const [showChildren, setShowChildren] = useState(false);

  return (
    <div style={{ marginLeft: comment.parent ? "20px" : "0" }}>
      <div
        style={{ cursor: "pointer", fontWeight: "bold", marginBottom: "5px" }}
        onClick={() => setShowChildren(!showChildren)}
      >
        {comment.body}
      </div>
      {showChildren &&
        comment.children.map((child) => (
          <Comment key={child.id} comment={child} />
        ))}
    </div>
  );
};

const CommentsUI = () => {
  const commentTree = buildCommentTree(comments);

  return (
    <div>
      {commentTree.map((comment) => (
        <Comment key={comment.id} comment={comment} />
      ))}
    </div>
  );
};

export default CommentsUI;
