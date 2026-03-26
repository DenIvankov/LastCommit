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
import { GuestRoute, ProtectedRoute } from "./shared/auth";

function App() {
  return (
    <>
      <Routes>
        <Route element={<GuestRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/Home" element={<HomePage />} />
          <Route path="/Explore" element={<Explore />} />
          <Route path="/Notifications" element={<Notifications />} />
          <Route path="/Messages" element={<Messages />} />
          <Route path="/Bookmarks" element={<Bookmarks />} />
          <Route path="/Profile" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<Navigate to="/Home" replace />} />
      </Routes>
    </>
  );
}

export default App;
