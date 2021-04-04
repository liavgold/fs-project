import React, { useState } from "react";
import { AuthContext } from "../App";


const Posts = () => {
  const { state: authState,dispatch } = React.useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const onCreate = async (event) => {
    event.preventDefault();
    const res = await fetch(`${process.env.REACT_APP_SERVER_URL}/post`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${authState.token}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },

      body: JSON.stringify({"post":{ title, content }}),
    });
    const data = await res.json();
        dispatch({
          type: "MAIN",
        });
  };

  const oncancel = () =>{
    dispatch({
      type: "MAIN",
    });

  };

  return (
    <div>
      <h2>Create New Post:</h2>
      <form onSubmit={onCreate}>
        <label>
          <input
            maxLength="30"
            minLength="1"
            type="text"
            placeholder="title"
            value={title}
            required
            onChange={(event) => setTitle(event.target.value)}
          />
          <br />
          <textarea
            minLength="10"
            maxLength="256"
            type="text"
            value={content}
            placeholder="content"
            required
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <br />
        <button type="submit">Create</button>
      </form>
      <br />
      <button onClick={oncancel}>Cancel</button>
    </div>
  );
};
export default Posts