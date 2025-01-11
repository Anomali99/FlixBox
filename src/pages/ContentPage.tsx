import { FC, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Footer, Header, VideoPlayer } from "../components";
import { getData } from "../data";

type ParamsType = { slug: string };

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

const ContentPage: FC = () => {
  const [content, setContent] = useState<FilmType | null>(null);
  const [path, setPath] = useState<{ path: string; eps?: string }>({
    path: "",
  });
  const { slug } = useParams<ParamsType>();
  const navigate = useNavigate();

  const setup = async () => {
    const response = await getData();
    if (response != null) {
      const result = response.film.find((film) => film.slug === slug);
      if (result) {
        setContent(result);
        if (result.type.toLowerCase() == "movie") {
          const moviePath = result.path as MoviePathType;
          setPath({ path: moviePath.moviePath });
        } else if (result.type.toLowerCase() == "series") {
          const seriesPath = result.path as SeriesType[];
          setPath({ path: seriesPath[0].moviePath, eps: seriesPath[0].eps });
        }
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  useEffect(() => {
    setup();
  }, [slug, navigate]);

  return (
    <>
      <Header index={-1} />
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="">{content?.title}</div>
        <VideoPlayer
          videoId={content?.id || 0}
          videoUrl={path.path}
          eps={path?.eps}
        />
      </div>
      <Footer />
    </>
  );
};

export default ContentPage;
