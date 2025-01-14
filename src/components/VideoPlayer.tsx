import { FC, useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getVideoProgress, postVideoProgress } from "../data";

type SubTitleType = {
  name: string;
  path: string;
  language?: string;
};

type Propstype = {
  videoUrl: string;
  videoId: number;
  eps?: string;
  subtitles?: SubTitleType[];
};

const VideoPlayer: FC<Propstype> = (props) => {
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [hasSeeked, setHasSeeked] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer | null>(null);
  const videoId = props.eps
    ? `${props.videoId}-${props.eps}`
    : props.videoId.toString();

  useEffect(() => {
    const savedProgress = getVideoProgress(videoId);
    if (savedProgress !== null) {
      setPlayedSeconds(savedProgress);
      console.log(`Loaded progress: ${savedProgress}`);
    } else {
      setPlayedSeconds(0);
      postVideoProgress(videoId, 0);
    }
  }, [props.videoId]);

  const handleReady = () => {
    if (playerRef.current && playedSeconds >= 0 && !hasSeeked) {
      playerRef.current.seekTo(playedSeconds, "seconds");
      console.log(`Seeking to: ${playedSeconds}`);
      setHasSeeked(true);
    }
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (hasSeeked) {
      setPlayedSeconds(progress.playedSeconds);
      postVideoProgress(videoId, progress.playedSeconds);
    }
  };

  return (
    <ReactPlayer
      ref={playerRef}
      url={`/movie/${props.videoUrl}`}
      controls
      onReady={handleReady}
      onProgress={handleProgress}
      progressInterval={1000}
      width="100%"
      height="100%"
      config={
        props.subtitles && props.subtitles.length > 0
          ? {
              file: {
                attributes: {
                  crossOrigin: "anonymous",
                },
                tracks: props.subtitles.map((subtitle, index) => ({
                  kind: "subtitles",
                  src: subtitle.path,
                  srcLang: subtitle.language || "id",
                  label: subtitle.name,
                  default: index === 0,
                })),
              },
            }
          : undefined
      }
    />
  );
};

export default VideoPlayer;
