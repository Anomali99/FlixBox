import { FC } from "react";
import { Footer, Header } from "../components";

const HistoryPage: FC = () => {
  return (
    <>
      <Header index={2} />
      <div className="flex flex-col lg:flex-row mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 gap-6">
        HistoryPage
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;
