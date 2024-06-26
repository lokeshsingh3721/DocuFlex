import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Videos from "./pages/Video";
import Images from "./pages/Images";
import FolderbyId from "./pages/FolderById";
import Documents from "./pages/Documents";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Layout from "./Layout";
import Protected from "./pages/Protected";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/*"
          element={
            <Protected>
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/documents" element={<Documents />} />
                  <Route path="/videos" element={<Videos />} />
                  <Route path="/images" element={<Images />} />
                  <Route path="/:name/:id" element={<FolderbyId />} />
                </Routes>
              </Layout>
            </Protected>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
