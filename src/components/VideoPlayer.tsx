import { FC, useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import { getVideoProgress, postVideoProgress } from "../data";

type Propstype = {
  videoUrl: string;
  videoId: number;
};

const VideoPlayer: FC<Propstype> = (props) => {
  const [playedSeconds, setPlayedSeconds] = useState<number>(0);
  const [hasSeeked, setHasSeeked] = useState<boolean>(false);
  const playerRef = useRef<ReactPlayer | null>(null);

  useEffect(() => {
    const savedProgress = getVideoProgress(props.videoId);
    if (savedProgress) {
      setPlayedSeconds(savedProgress);
      console.log(`Loaded progress: ${savedProgress}`);
    }
  }, [props.videoId]);

  const handleReady = () => {
    if (playerRef.current && playedSeconds > 0 && !hasSeeked) {
      playerRef.current.seekTo(playedSeconds, "seconds");
      console.log(`Seeking to: ${playedSeconds}`);
      setHasSeeked(true);
    }
  };

  const handleProgress = (progress: { playedSeconds: number }) => {
    if (hasSeeked) {
      setPlayedSeconds(progress.playedSeconds);
      postVideoProgress(props.videoId, progress.playedSeconds);
    }
  };

  return (
    <div>
      <ReactPlayer
        ref={playerRef}
        url={props.videoUrl}
        controls
        onReady={handleReady}
        onProgress={handleProgress}
        progressInterval={1000}
      />
    </div>
  );
};

export default VideoPlayer;
