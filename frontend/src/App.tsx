import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Files from "./pages/Files";
import Layout from "./Layout";
function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/files" element={<Files />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
