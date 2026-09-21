import { FaStar } from "react-icons/fa";
import { getSkillLevel, getSkillStars } from "@/data/skills";

const FiveStar = ({ range }: { range: number }) => {
  const level = getSkillLevel(range);
  const stars = getSkillStars(range);

  return (
    <div
      className="flex items-center justify-center gap-0.5 sm:gap-1"
      aria-label={`${level}, ${stars} stars`}
    >
      {Array.from({ length: stars }).map((_, index) => (
        <FaStar
          key={index}
          className="text-yellow-500 h-2.5 w-2.5 sm:h-3.5 sm:w-3.5 md:h-4 md:w-4"
        />
      ))}
    </div>
  );
};

export default FiveStar;
