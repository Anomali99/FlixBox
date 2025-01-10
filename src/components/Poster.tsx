import { FC } from "react";

type PropsType = {
  title: string;
  href: string;
  url: string;
  type: string;
};

const Poster: FC<PropsType> = (props) => {
  return (
    <div className="group hover:scale-105">
      <a href={props.href}>
        <div className="relative w-full">
          <img
            className="w-full h-full rounded-t-md"
            src={`/image/${props.url}`}
            alt={props.title}
          />
          <div className="absolute top-0 right-0 bg-primary text-bgColor uppercase font-bold text-xs lg:text-sm py-1 px-2 rounded-tr-md rounded-bl-md">
            {props.type}
          </div>
          <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-b from-transparent to-white group-hover:to-secondary"></div>
        </div>
        <div className="bg-white rounded-b-md px-2 pb-1 group-hover:bg-secondary">
          <div className="font-semibold">{props.title}</div>
        </div>
      </a>
    </div>
  );
};

export default Poster;
