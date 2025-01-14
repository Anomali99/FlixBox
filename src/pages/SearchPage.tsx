import { FC, useEffect, useState } from "react";
import { Container, Footer, Header } from "../components";
import { getData } from "../data";

type SubTitleType = {
  name: string;
  path: string;
  language?: string;
};

type GenreType = {
  id: number;
  name: string;
};

type ClassType = {
  id: number;
  name: string;
};

type GroupType = {
  id: number;
  name: string;
  class?: ClassType[];
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
  group: GroupType;
  class?: ClassType;
  genre: GenreType[];
  path: MoviePathType | SeriesType[];
};

type FilterValueType = {
  name: string;
  onClick: () => void;
};

type FilterItemType = {
  name: string;
  value: FilterValueType[];
};

type FilterType = {
  year: string[];
  type: string[];
  group: string[];
  genre: string[];
};

const SearchPage: FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [trigger, setTrigger] = useState<boolean>(false);
  const [film, setFilm] = useState<FilmType[]>([]);
  const [filterList, setFilterList] = useState<FilterItemType[]>([]);
  const [filter, setFilter] = useState<FilterType>({
    year: ["all"],
    type: ["all"],
    group: ["all"],
    genre: ["all"],
  });

  const setup = async () => {
    const response = await getData();
    const filteredFilm: FilmType[] = [];
    const genreFilter: FilterValueType[] = [];
    const groupFilter: FilterValueType[] = [];
    const yearFilter: FilterValueType[] = [];
    const typeFilter: FilterValueType[] = [
      { name: "all", onClick: () => changeFilter("type", "all") },
      { name: "series", onClick: () => changeFilter("type", "series") },
      { name: "movie", onClick: () => changeFilter("type", "movie") },
    ];

    yearFilter.push({
      name: "all",
      onClick: () => changeFilter("year", "all"),
    });
    genreFilter.push({
      name: "all",
      onClick: () => changeFilter("genre", "all"),
    });
    groupFilter.push({
      name: "all",
      onClick: () => changeFilter("group", "all"),
    });
    if (response) {
      response.genre.forEach((item) => {
        genreFilter.push({
          name: item.name,
          onClick: () => changeFilter("genre", item.name),
        });
      });
      response.group.forEach((item) => {
        groupFilter.push({
          name: item.name,
          onClick: () => changeFilter("group", item.name),
        });
      });
      yearFilter.push(
        ...new Map(
          response.film.map((item) => [
            item.year,
            { name: item.year, onClick: () => changeFilter("year", item.year) },
          ])
        ).values()
      );

      response.film.forEach((item) => {
        if (
          (filter.type.includes("all") || filter.type.includes(item.type)) &&
          (filter.year.includes("all") || filter.year.includes(item.year)) &&
          (filter.genre.includes("all") ||
            item.genre.some((value) => filter.genre.includes(value.name))) &&
          (filter.group.includes("all") ||
            filter.group.includes(item.group.name)) &&
          item.title.toLowerCase().includes(inputValue.toLowerCase())
        ) {
          filteredFilm.push(item);
        }
      });
    }

    setFilm(filteredFilm);
    setFilterList([
      { name: "year", value: yearFilter },
      { name: "type", value: typeFilter },
      { name: "group", value: groupFilter },
      { name: "genre", value: genreFilter },
    ]);
  };

  const changeFilter = (key: keyof FilterType, value: string) => {
    setFilter((prev) => {
      if (value !== "all" && prev[key].includes("all")) {
        return {
          ...prev,
          [key]: [value],
        };
      }

      if (value === "all") {
        return {
          ...prev,
          [key]: ["all"],
        };
      }

      if (prev[key].includes(value)) {
        return {
          ...prev,
          [key]: prev[key].filter((item) => item !== value),
        };
      } else {
        return {
          ...prev,
          [key]: [...prev[key], value],
        };
      }
    });
  };

  useEffect(() => {
    setup();

    console.log(filter);
  }, [trigger, filter]);

  return (
    <>
      <Header index={1} />
      <div className="mx-auto w-full max-w-screen-xl p-4">
        <div className="uppercase bg-primary px-2 py-1 mb-4 rounded-md font-bold text-bgColor">
          {filterList.map((item, index) => (
            <div key={index} className="w-full flex flex-row items-center mb-1">
              <p className="bg-primary w-20 h-full">{item.name}</p>
              <div className="w-full flex flex-wrap items-center px-1 gap-x-1 gap-y-[0.0625] bg-bgColor rounded-md">
                {item.value.map((value, i) => (
                  <button
                    key={i}
                    onClick={value.onClick}
                    className={`rounded-md my-0.5 px-1 py-0.5 uppercase hover:bg-white hover:text-primary ${
                      filter[item.name as keyof FilterType].includes(value.name)
                        ? "bg-primary text-bgColor"
                        : "text-white bg-secondary"
                    }`}
                  >
                    {value.name}
                  </button>
                ))}
              </div>
            </div>
          ))}
          <div className="w-full flex flex-row">
            <input
              className="w-full rounded-l-md px-1 py-0.5 text-primary"
              placeholder="Search..."
              type="text"
              value={inputValue}
              onChange={(event) => {
                setInputValue(event.target.value);
              }}
            />
            <button
              onClick={() => setTrigger(!trigger)}
              className="w-1/3 lg:w-1/6 text-white bg-secondary rounded-r-md px-1 py-0.5 hover:bg-tertiary hover:text-primary"
            >
              Search
            </button>
          </div>
        </div>
        <Container film={film} />
      </div>
      <Footer />
    </>
  );
};

export default SearchPage;
