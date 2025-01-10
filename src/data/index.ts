type SubTitleType = {
  name: string;
  path: string;
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

type DataType = {
  genre: GenreType[];
  group: GroupType[];
  film: FilmType[];
};

const getVideoProgress = (videoId: number): number | null => {
  const savedProgress = localStorage.getItem(`progress-${videoId}`);
  if (savedProgress == null) return null;
  const progress = parseFloat(savedProgress);
  return isNaN(progress) ? null : progress;
};

const postVideoProgress = (videoId: number, playedSeconds: number) => {
  localStorage.setItem(`progress-${videoId}`, playedSeconds.toString());
  console.log(`Saving progress: ${playedSeconds}`);
};

export { getVideoProgress, postVideoProgress };
