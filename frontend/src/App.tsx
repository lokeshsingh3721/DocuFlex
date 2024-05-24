import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Files from "./pages/Files";
import Layout from "./Layout";
import Videos from "./pages/Video";
import Images from "./pages/Images";
import FolderbyId from "./pages/FolderById";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<Files />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/images" element={<Images />} />
          <Route path="/:name/:id" element={<FolderbyId />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
