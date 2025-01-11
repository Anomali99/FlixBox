import { FC, useEffect, useState } from "react";
import { Container, Footer, Header } from "../components";
import { getData } from "../data";

type SubTitleType = {
  name: string;
  path: string;
};

type ClassType = {
  id: number;
  name: string;
};

type MoviePathType = {
  moviePath: string;
  subTitle?: SubTitleType[];
};

type SeriesType = {
  eps: string;
  moviePath: string;
  subTitle?: SubTitleType[];
};

type FilmType = {
  id: number;
  title: string;
  slug: string;
  year: string;
  type: string;
  poster: string;
  group: ClassType;
  class?: ClassType;
  genre: ClassType[];
  path: MoviePathType | SeriesType[];
};

const HomePage: FC = () => {
  const [film, setFilm] = useState<FilmType[]>([]);

  const setup = async () => {
    const response = await getData();
    if (response != null) {
      setFilm(response.film);
      // const listFilm: FilmType[] = [];
      // for (let i = 0; i < 10; i++) {
      //   response.film.forEach((value) => {
      //     listFilm.push(value);
      //   });
      // }
      // setFilm(listFilm);
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
