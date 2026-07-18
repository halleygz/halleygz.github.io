import { HeadingProps } from "@/types/ComponentProps";

const Heading: React.FC<HeadingProps> = ({ content }) => {
  return (
    <div>
      <h1 className="font-mono font-light text-4xl lg:text-8xl lg:font-thin">{content}</h1>
    </div>
  );
};

export default Heading;
