import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import { useState } from "react";

import Quiz from "./Quiz";
import Admin from "./Admin";
import Login from "./Login";
import Signup from "./Signup";
import Leaderboard from "./Leaderboard";

import ProtectedRoute from "./ProtectedRoute";

import "./App.css";

export default function App() {
  const [darkMode, setDarkMode] =
    useState(false);

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.location.href = "/login";
  };

  return (
    <BrowserRouter>
      <div className={darkMode ? "dark-mode" : ""}>
        <nav className="navbar">
          <Link to="/" className="nav-link">
            Quiz
          </Link>

          <Link
            to="/leaderboard"
            className="nav-link"
          >
            Leaderboard
          </Link>

          <Link
            to="/admin"
            className="nav-link"
          >
            Admin
          </Link>

          {!user && (
            <>
              <Link
                to="/login"
                className="nav-link"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="nav-link"
              >
                Signup
              </Link>
            </>
          )}

          {user && (
            <>
              <span
                style={{
                  color: "white",
                  marginLeft: "10px",
                }}
              >
                Hi, {user.username}
              </span>

              <button
                className="dark-toggle"
                onClick={logout}
              >
                Logout
              </button>
            </>
          )}

          <button
            className="dark-toggle"
            onClick={() =>
              setDarkMode(!darkMode)
            }
          >
            {darkMode
              ? "Light Mode"
              : "Dark Mode"}
          </button>
        </nav>

        <Routes>
          <Route
            path="/"
            element={<Quiz />}
          />

          <Route
            path="/leaderboard"
            element={<Leaderboard />}
          />

          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <Admin />
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<Login />}
          />

          <Route
            path="/signup"
            element={<Signup />}
          />
        </Routes>
      </div>
    </BrowserRouter>
  );
}