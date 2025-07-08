import { FilmType, DataType, ConfigType, LocalStorageType } from "./types";

const getData = async (): Promise<DataType | null> => {
  try {
    const response = await fetch(`/data.json?t=${Date.now()}`);
    const config = await getConfig();
    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }

    const data: DataType | null = await response.json();
    const filtered: FilmType[] = [];

    if (data && "film" in data && Array.isArray(data.film)) {
      data.film.forEach((item) => {
        if (
          !config.hide.title?.includes(item.title) &&
          !config.hide.year?.includes(item.year) &&
          !config.hide.type?.includes(item.type) &&
          !config.hide.group?.includes(item.group.name) &&
          !(item.class && config.hide.class?.includes(item.class.name)) &&
          !item.genre.some((value) => config.hide.group?.includes(value.name))
        ) {
          filtered.push(item);
        }
      });
      return { ...data, film: filtered };
    } else {
      return data;
    }
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return null;
  }
};

const getConfig = async (): Promise<ConfigType> => {
  try {
    const response = await fetch(`/app.conf.json?t=${Date.now()}`);
    if (!response.ok) {
      throw new Error(
        `Network response was not ok: ${response.status} ${response.statusText}`
      );
    }
    const data = await response.json();
    return data as ConfigType;
  } catch (error) {
    console.error("There has been a problem with your fetch operation:", error);
    return {
      height: 4,
    } as ConfigType;
  }
};

const getVideoProgress = (videoId: string): number | null => {
  const savedProgress = localStorage.getItem(`progress-${videoId}`);
  if (savedProgress == null) return null;
  const progress = parseFloat(savedProgress);
  return isNaN(progress) ? null : progress;
};

const postVideoProgress = (videoId: string, playedSeconds: number) => {
  const timestamp = new Date().toISOString();
  localStorage.setItem(`progress-${videoId}`, playedSeconds.toString());
  localStorage.setItem(`progress-${videoId}-updated`, timestamp);
  console.log(`Saving progress: ${playedSeconds} at ${timestamp}`);
};

const getAllVideoProgress = (): LocalStorageType[] => {
  const allProgress: LocalStorageType[] = [];

  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("progress-") && !key.endsWith("-updated")) {
      const videoId = key.replace("progress-", "");
      const progress = parseFloat(localStorage.getItem(key) || "0");
      const updatedAt = localStorage.getItem(`${key}-updated`);
      allProgress.push({ videoId, progress, updatedAt });
    }
  }

  return allProgress.sort((a, b) => {
    if (!a.updatedAt || !b.updatedAt) return 0;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
};

const clearVideoProgress = () => localStorage.clear();

export {
  getVideoProgress,
  postVideoProgress,
  getAllVideoProgress,
  clearVideoProgress,
  getData,
  getConfig,
};
