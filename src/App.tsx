import { Navigate, Route, Routes } from "react-router";
import "./App.css";
import Bookmarks from "./pages/Bookmarks";
import Explore from "./pages/Explore";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import Messages from "./pages/Messages";
import Notifications from "./pages/Notifications";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { ProtectedRoute, useAuth } from "./shared/auth";

function App() {
  const { isAuthenticated, isHydrating } = useAuth();

  return (
    <>
      <Routes>
        <Route
          path="/login"
          element={
            !isHydrating && isAuthenticated ? (
              <Navigate to="/Home" replace />
            ) : (
              <LoginPage />
            )
          }
        />
        <Route
          path="/register"
          element={
            !isHydrating && isAuthenticated ? (
              <Navigate to="/Home" replace />
            ) : (
              <RegisterPage />
            )
          }
        />

        <Route
          path="/Home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Explore"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Bookmarks"
          element={
            <ProtectedRoute>
              <Bookmarks />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Profile"
          element={
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="*"
          element={
            <Navigate to={isAuthenticated ? "/Home" : "/login"} replace />
          }
        />
      </Routes>
    </>
  );
}

export default App;
