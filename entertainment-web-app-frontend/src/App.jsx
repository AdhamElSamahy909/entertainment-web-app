import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./ui/ProtectedRoute";
import AppLayout from "./ui/AppLayout";
import HomePage from "./pages/HomePage";
import MoviesPage from "./pages/MoviesPage";
import TVSeriesPage from "./pages/TVSeriesPage";
import BookmarkedPage from "./pages/BookmarkedPage";
import LoginSignupPage from "./pages/LoginSignupPage";
import { Toaster } from "react-hot-toast";
import VideoPlayer from "./ui/VideoPlayer";
import VideoPlayerTest from "./ui/VideoPlayerTest";
import VideoTest2 from "./ui/VideoTest2";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<HomePage />} />
          <Route path="movies" element={<MoviesPage />} />
          <Route path="tvseries" element={<TVSeriesPage />} />
          <Route path="bookmarked" element={<BookmarkedPage />} />
          <Route path="videos/:videoID" element={<VideoPlayer />} />
        </Route>

        <Route path="test" element={<VideoPlayerTest />} />
        <Route path="test2" element={<VideoTest2 />} />
        <Route path="login" element={<LoginSignupPage />} />
        <Route path="signup" element={<LoginSignupPage />} />
      </Routes>
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: { duration: 2000 },
          error: { duration: 2000 },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#172554",
            color: "#F1F0E8",
          },
        }}
      />
    </BrowserRouter>
  );
}

export default App;
