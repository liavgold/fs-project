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
      <h2
        style={{
          backgroundColor: "Aquamarine",
          display: "flex",
          justifyContent: "center",
        }}
      >
        Create New Post:
      </h2>
      <form onSubmit={onCreate}>
        <label>
          Title
          <input
            maxLength="30"
            minLength="1"
            type="text"
            value={title}
            required
            onChange={(event) => setTitle(event.target.value)}
          />
        </label>
        <label>
          Content
          <textarea
            minLength="10"
            maxLength="256"
            type="text"
            value={content}
            required
            onChange={(event) => setContent(event.target.value)}
          />
        </label>
        <br />
        <br />
        <button type="submit">Create</button>
      </form>
      <br />
      <hr />
      <button onClick={oncancel}>Cancel</button>
    </div>
  );
};
export default Posts