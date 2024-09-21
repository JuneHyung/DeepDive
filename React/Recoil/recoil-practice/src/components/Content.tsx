import OpenPage from "@/pages/OpenPage";
import Layout01 from "@/pages/Layout01";

import { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";

const Content = () => {
  return (
    <div className="content">
      <RecoilRoot>
        <BrowserRouter>
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<OpenPage />}></Route>
              <Route path="/page01" element={<Layout01 />}></Route>
            </Routes>
          </Suspense>
        </BrowserRouter>
      </RecoilRoot>
    </div>
  );
};

export default Content;
