import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./Layout";
import Videos from "./pages/Video";
import Images from "./pages/Images";
import FolderbyId from "./pages/FolderById";
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Protected from "./pages/Protected";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/documents"
            element={
              <Protected>
                <Documents />
              </Protected>
            }
          />
          <Route
            path="/videos"
            element={
              <Protected>
                <Videos />
              </Protected>
            }
          />
          <Route
            path="/images"
            element={
              <Protected>
                <Images />
              </Protected>
            }
          />
          <Route
            path="/:name/:id"
            element={
              <Protected>
                <FolderbyId />
              </Protected>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
