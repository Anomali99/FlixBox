import { FC } from "react";
import { Routes, Route } from "react-router-dom";
import { HomePage, SearchPage, HistoryPage, ContentPage } from "../pages";

const Router: FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/search" element={<SearchPage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="/:slug" element={<ContentPage />} />
    </Routes>
  );
};

export default Router;
