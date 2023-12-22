import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import AppBar from "./components/AppBar";
import AllBoardings from "./pages/AllBoardings";
import NstayMap from "./pages/NstayMap";
import Profile from "./pages/Profile";
import News from "./pages/News";
import ContactUs from "./pages/ContactUs";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<AppBar />}>
            <Route index element={<AllBoardings />} />
            <Route path="nstayMap" element={<NstayMap />} />
            <Route path="news" element={<News />} />
            <Route path="contactUS" element={<ContactUs />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
