export interface SubTitleType {
  name: string;
  path: string;
  language?: string;
}

export interface GenreType {
  id: number;
  name: string;
}

export interface ClassType extends GenreType {}

export interface GroupType extends GenreType {
  class?: ClassType[];
}

export interface MoviePathType {
  moviePath: string;
  subTitle?: SubTitleType[];
}

export interface SeriesPathType extends MoviePathType {
  eps: string;
}

export interface FilmType {
  id: number;
  title: string;
  slug: string;
  year: string;
  type: string;
  poster: string;
  group: GroupType;
  class?: ClassType;
  genre: GenreType[];
  path: MoviePathType | SeriesPathType[];
}

export interface DataType {
  genre: GenreType[];
  group: GroupType[];
  film: FilmType[];
}

export interface ConfigType {
  height: number;
  hide: {
    title?: string[];
    year?: string[];
    type?: string[];
    group?: string[];
    class?: string[];
    genre?: string[];
  };
}

export interface LocalStorageType {
  videoId: string;
  progress: number;
  updatedAt: string | null;
}
