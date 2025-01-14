import { FC, useEffect, useState } from "react";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { Container, Footer, Header, VideoPlayer } from "../components";
import { getData } from "../data";

type ParamsType = { slug: string };

type SubTitleType = {
  name: string;
  path: string;
  language?: string;
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
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [oneGroup, setOneGroup] = useState<FilmType[]>([]);
  const [others, setOthers] = useState<FilmType[]>([]);
  const [content, setContent] = useState<FilmType | null>(null);
  const [path, setPath] = useState<string>("");
  const [eps, setEps] = useState<string | null>(searchParams.get("eps"));
  const { slug } = useParams<ParamsType>();

  useEffect(() => {
    setup();
  }, [slug, navigate]);

  const setup = async () => {
    const response = await getData();
    if (response != null) {
      const result = grouping(response.film);
      if (result) {
        setContent(result);
        if (result.type.toLowerCase() == "movie") {
          const moviePath = result.path as MoviePathType;
          setPath(moviePath.moviePath);
        } else if (result.type.toLowerCase() == "series") {
          const seriesPaths = result.path as SeriesType[];
          const findPath = eps
            ? seriesPaths.find((item) => item.eps === eps)
            : undefined;
          const seriesPath = findPath || seriesPaths[0];
          setPath(seriesPath.moviePath);
          if (!eps) setEps(seriesPath.eps);
        }
      } else {
        navigate("/");
      }
    } else {
      navigate("/");
    }
  };

  const grouping = (data: FilmType[]): FilmType | undefined => {
    const oneGroupTemp: FilmType[] = [];
    const othersTemp: FilmType[] = [];
    let contentTemp = data.find((film) => film.slug === slug);

    data.forEach((item) => {
      if (item.id !== contentTemp?.id) {
        if (item.group === contentTemp?.group) {
          oneGroupTemp.push(item);
        } else {
          othersTemp.push(item);
        }
      }
    });

    setOneGroup(oneGroupTemp);
    setOthers(othersTemp);
    return contentTemp;
  };

  const getSeriesPath = (): SeriesType[] => {
    if (content?.type.toLowerCase() === "series") {
      return content.path as SeriesType[];
    } else {
      return [];
    }
  };

  return (
    <>
      <Header index={-1} />
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="uppercase bg-primary px-2 py-1 mb-4 rounded-md font-bold text-bgColor">
          {content?.title}
        </div>
        <div className="w-full h-max lg:h-[50vh] flex flex-col-reverse lg:flex-row gap-3">
          <div className="w-full lg:w-2/3 bg-black">
            <VideoPlayer
              videoId={content?.id || 0}
              videoUrl={path}
              eps={eps || undefined}
            />
          </div>
          <div className="w-full lg:w-1/3 h-max lg:h-full flex flex-row lg:flex-col p-4 gap-4 items-center bg-secondary rounded-md">
            <img
              src={`/image/${content?.poster}`}
              alt="poster"
              className="w-1/3 lg:w-40 object-contain rounded-md"
            />
            <div className="w-full h-full font-semibold capitalize">
              <p className="font-bold text-xl text-wrap hidden lg:block">
                {content?.title}
              </p>
              <p>Year: {content?.year}</p>
              <p>Type: {content?.type}</p>
              <p>Group: {content?.group?.name}</p>
              {content?.class && <p>Class: {content?.class?.name}</p>}
              <p>
                Genre: {content?.genre?.map((item) => item.name).join(", ")}
              </p>
            </div>
          </div>
        </div>
        {content?.type.toLowerCase() === "series" ? (
          <div className="bg-tertiary grid grid-cols-10 lg:grid-cols-27 gap-1.5 lg:gap-3 mt-3 p-4 rounded-md">
            {getSeriesPath().map((item) => (
              <a
                className={`px-1 py-0.5 text-sm lg:text-base lg:px-2 lg:py-1 rounded-md  ${
                  eps === item.eps
                    ? "bg-primary text-bgColor cursor-default"
                    : "bg-bgColor text-primary hover:bg-secondary hover:text-bgColor"
                }`}
                href={`/${slug}?eps=${item.eps}`}
              >
                {item.eps}
              </a>
            ))}
          </div>
        ) : (
          ""
        )}
        {oneGroup.length !== 0 ? (
          <>
            <div className="uppercase bg-primary px-2 py-1 mt-6 mb-4 rounded-md font-bold text-bgColor">
              the same group
            </div>
            <Container film={oneGroup} height={1} />
          </>
        ) : (
          ""
        )}
        {others.length !== 0 ? (
          <>
            <div className="uppercase bg-primary px-2 py-1 mt-6 mb-4 rounded-md font-bold text-bgColor">
              others
            </div>
            <Container film={others} height={1} />
          </>
        ) : (
          ""
        )}
      </div>
      <Footer />
    </>
  );
};

export default ContentPage;
