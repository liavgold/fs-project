import React from "react";
export const Card = ({ post }) => {
  return (
    <div className="card" style={{ backgroundColor: "#ddd" }}>
      <div className="colu">
        <h2 style={{ color: "blue" }}>{post.title}</h2>
        <p style={{ color: "darkBlue" }}>{post.content}</p>
      </div>
    </div>
  );
};
export default Card;
