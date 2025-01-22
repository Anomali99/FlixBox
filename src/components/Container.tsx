import { FC, useEffect, useState } from "react";
import Poster from "./Poster";
import Pagination from "./Pagination";
import { getConfig } from "../data";
import { FilmType } from "../data/types";

type PropsType = { film: FilmType[]; height?: number };

const Container: FC<PropsType> = (props) => {
  const [film, setFilm] = useState<FilmType[]>([]);
  const [page, setPage] = useState<number>(1);
  const [maxPage, setMaxPage] = useState<number>(1);

  const setup = async () => {
    const config = props.height ? props.height : (await getConfig()).height;
    const maxData = 6 * config;
    const max = Math.ceil(props.film.length / maxData);
    const startIndex = (page - 1) * maxData;
    const endIndex = startIndex + maxData;
    setMaxPage(max);
    setFilm(props.film.slice(startIndex, endIndex));
  };

  useEffect(() => {
    setup();
  }, [page, props.film]);

  return (
    <>
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
      <Pagination page={page} max={maxPage} setCurrent={setPage} />
    </>
  );
};

export default Container;
