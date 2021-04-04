import React from "react";
import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import Header from "./components/Header";
import Register from "./components/Register";
import Posts from "./components/Posts";
export const AuthContext = React.createContext();
const initialState = {
  isAuthenticated: false,
  isRegistered: true,
  isPosted: false,
  user: null,
  token: null,
};
const reducer = (state, action) => {
  switch (action.type) {
    case "MAIN":
      return {
        ...state,
        isPosted: false,
      };
    case "LOGIN":
      localStorage.setItem("name", JSON.stringify(action.payload.name));
      localStorage.setItem("email", JSON.stringify(action.payload.email));
      localStorage.setItem("token", JSON.stringify(action.payload.token));
      return {
        ...state,
        isAuthenticated: true,
        isRegistered: true,
        isPosted: false,
        user: action.payload.user,
        token: action.payload.token,
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: true,
        isPosted: false,
        user: null,
      };
    case "SIGNUP":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        isRegistered: false,
        isPosted: false,
        user: null,
      };
    case "CREATE_POST":
      return {
        ...state,
        isPosted: true,
      };
    default:
      return state;
  }
};
function App() {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const isRefresh = () => {
    const rawName = localStorage.getItem("name");
    const rawEmail = localStorage.getItem("email");
    const rawToken = localStorage.getItem("token");
    if (rawName && rawEmail && rawToken) {
      const name = JSON.parse(rawName);
      const email = JSON.parse(rawEmail);
      const token = JSON.parse(rawToken);
      dispatch({
        type: "LOGIN",
        payload: { name, email, token },
      });
    }
  };
  React.useEffect(() => {
    isRefresh();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      <div className="App">
        {!state.isAuthenticated && !state.isRegistered ? (
          <React.Fragment>
            <Register />
          </React.Fragment>
        ) : !state.isAuthenticated ? (
          <React.Fragment>
            <Login />
          </React.Fragment>
        ) : state.isAuthenticated && !state.isPosted ? (
          <React.Fragment>
            <Header />
            <Home />
          </React.Fragment>
        ) : (
          <React.Fragment>
            <Posts />
          </React.Fragment>
        )}
      </div>
    </AuthContext.Provider>
  );
}
export default App;
