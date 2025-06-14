interface AvatarProps {
  url: string;
  width: "w-44" | "w-24";
  rounded?: boolean;
}

export const Avatar = ({
  url = "https://avatars.githubusercontent.com/u/1178427?v=4",
  width,
  rounded,
}: AvatarProps) => {
  return <img src={url} className={`${rounded && "rounded-full"} ${width}`} />;
};
