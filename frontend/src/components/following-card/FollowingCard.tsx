import { Avatar } from "../avatar/Avatar";

interface FollowingCardProps {
  name: string;
  avatar: string;
}

export const FollowingCard = ({ name, avatar }: FollowingCardProps) => {
  return (
    <div className="flex flex-col items-center">
      <Avatar width="w-24" url={avatar} />
      <span>{name}</span>
    </div>
  );
};
