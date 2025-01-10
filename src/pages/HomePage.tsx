import { FC, useEffect, useState } from "react";
import { Footer, Header, Poster } from "../components";

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

  useEffect(() => {
    const filmList: FilmType[] = [];
    for (let i = 1; i < 41; i++) {
      filmList.push({
        id: i,
        title: `Soul Land ${i}`,
        slug: `soul-land-${i}`,
        year: "2024",
        type: "movie",
        poster: "poster.jpg",
        group: { id: 1, name: "animation" },
        genre: [{ id: 1, name: "action" }],
        path: { moviePath: "film.mkv" },
      });
    }
    setFilm(filmList);
  }, []);

  return (
    <>
      <Header index={0} />
      <div className="mx-auto w-full max-w-screen-xl p-4 ">
        <div className="uppercase bg-primary px-2 py-1 mb-4 rounded-md font-bold text-bgColor">
          my collection
        </div>
        <div className="grid gap-3 lg:gap-6 grid-cols-3 lg:grid-cols-6 ">
          {film.map((item, index) => (
            <Poster
              key={index}
              title={item.title}
              type={item.type}
              href={item.slug}
              url={item.poster}
            />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HomePage;
