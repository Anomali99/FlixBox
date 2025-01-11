import { FC, useEffect, useState } from "react";
import { Container, Footer, Header } from "../components";
import { clearVideoProgress, getAllVideoProgress, getData } from "../data";

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

const HistoryPage: FC = () => {
  const [film, setFilm] = useState<FilmType[]>([]);

  const setup = async () => {
    const data = await getData();
    const cache = getAllVideoProgress();

    const history: FilmType[] = [];
    console.log("start");
    cache.forEach((item) => {
      const videoIdStorage = item.videoId.split("-");
      const videoId = parseInt(videoIdStorage[0]);
      const videoEps = videoIdStorage[1];
      if (!isNaN(videoId) && data) {
        const result = data.film.find((film) => film.id === videoId);
        if (result)
          history.push(
            videoEps
              ? {
                  ...result,
                  title: `${result.title} Eps ${videoEps}`,
                  slug: `${result.slug}?eps=${videoEps}`,
                }
              : result
          );
      }
    });
    console.log("end");
    setFilm(history);
  };

  useEffect(() => {
    setup();
  }, []);

  return (
    <>
      <Header index={2} />
      <div className="mx-auto w-full max-w-screen-xl p-4 ">
        <div className="uppercase flex justify-between bg-primary px-2 py-1 mb-4 rounded-md font-bold text-bgColor">
          History
          <button
            onClick={() => {
              clearVideoProgress();
              setFilm([]);
            }}
            className="uppercase text-sm bg-red-500 text-white px-2 py-0.5 rounded-md hover:bg-red-600"
          >
            clear history
          </button>
        </div>
        <Container film={film} />
      </div>
      <Footer />
    </>
  );
};

export default HistoryPage;
