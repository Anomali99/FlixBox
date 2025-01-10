import { FC } from "react";
import { Footer, Header } from "../components";

const SearchPage: FC = () => {
  return (
    <>
      <Header index={1} />
      <div className="flex flex-col lg:flex-row mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8 gap-6">
        SearchPage
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
