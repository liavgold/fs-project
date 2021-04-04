import React from "react";
import { AuthContext } from "../App";
import Card from "./Card";

const initialState = {
  posts: [],
  isFetching: false,
  hasError: false,
};   

const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_POSTS_REQUEST":
      return {
        ...state,
        isFetching: true,
        hasError: false,
      };
    case "FETCH_POSTS_SUCCESS":
      return {
        ...state,
        isFetching: false,
        posts: action.payload,
      };
    case "FETCH_POSTS_FAILURE":
      return {
        ...state,
        hasError: true,
        isFetching: false,
      };
    default:
      return state;
  }
};
export const Home = () => {
  const { state: authState ,dispatch} = React.useContext(AuthContext);
  const [state, homeDispatch] = React.useReducer(reducer, initialState);
    const onCrateNewPost = () => {
      dispatch({
        type: "CREATE_POST",
      });
    };
  React.useEffect(() => {
    homeDispatch({
      type: "FETCH_POSTS_REQUEST",
    });
    fetch(`${process.env.REACT_APP_SERVER_URL}/post`, {
      method:"get",
      headers: {
        Authorization: `Bearer ${authState.token}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw res;
        }
      })
      .then((resJson) => {
        console.log(resJson.posts);
        homeDispatch({
          type: "FETCH_POSTS_SUCCESS",
          payload: resJson.posts,
        });
      })
      .catch((error) => {
        console.log(error);
        homeDispatch({
          type: "FETCH_POSTS_FAILURE",
        });
      });
  }, [authState.token]);


  return (
    <React.Fragment>
      <div className="home">
        {state.isFetching ? (
          <span className="loader">LOADING...</span>
        ) : state.hasError ? (
          <span className="error">AN ERROR HAS OCCURED</span>
        ) : state.posts.length === 0 ? (
          <div className="row" style={{ color: "blue" }}>
            no posts yet
          </div>
        ) : (
          <React.Fragment>
            <div className="row">
              {state.posts.length > 0 &&
                state.posts.map((post) => (
                  <Card key={post._id.toString()} post={post} />
                ))}
            </div>
          </React.Fragment>
        )}
        <button onClick={onCrateNewPost}>Create New Post </button>
      </div>
    </React.Fragment>
  );



};
export default Home;
