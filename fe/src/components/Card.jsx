import React from "react";
export const Card = ({ post }) => {
  return (
    <div className="card" style={{ border:"darkBlue" }}>
      <div className="colu">
        <h2 style={{ color: "GoldenRod" }}>{post.title}</h2>
        <p style={{ color: "black" }}>{post.content}</p>
      </div>
    </div>
  );
};
export default Card;
