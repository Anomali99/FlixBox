import { FC, useEffect, useState } from "react";
import { Container, Footer, Header } from "../components";
import { getData } from "../data";
import { FilmType } from "../data/types";

const HomePage: FC = () => {
  const [film, setFilm] = useState<FilmType[]>([]);

  const setup = async () => {
    const response = await getData();
    if (response != null) {
      setFilm(response.film);
    }
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <>
      <Header index={0} />
      <div className="mx-auto w-full max-w-screen-xl p-4 ">
        <div className="uppercase bg-primary px-2 py-1 mb-4 rounded-md font-bold text-bgColor">
          my collection
        </div>
        <Container film={film} />
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
