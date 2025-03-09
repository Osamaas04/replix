import { Marquee } from "../ui/marquee";

const reviews = [
  {
    body: "I've never seen anything like this before",
    img: "https://avatar.vercel.sh/jack",
    margin: "ml-20",
    blur: "blur-sm",

  },
  {
    body: "I don't know what to say.",
    img: "https://avatar.vercel.sh/jill",
    margin: "ml-36",
    blur: "blur-sm",

  },
  {
    body: "I'm at a loss for words.",
    img: "https://avatar.vercel.sh/john",
    margin: "ml-6",
    blur: "blur-sm",

  },
  {
    body: "This is absolutely incredible!",
    img: "https://avatar.vercel.sh/alex",
    margin: "ml-24",
    blur: "blur-sm",

  },
  {
    body: "A truly amazing experience.",
    img: "https://avatar.vercel.sh/sam",
    margin: "ml-4",
    blur: "blur-sm",

  },
  {
    body: "I can't stop thinking about this.",
    img: "https://avatar.vercel.sh/mia",
    margin: "ml-40",
    blur: "blur-sm",

  },
  {
    body: "I'm inspired beyond words.",
    img: "https://avatar.vercel.sh/ryan",
    margin: "ml-28",
    blur: "blur-sm",

  },
  {
    body: "This made my day!",
    img: "https://avatar.vercel.sh/lisa",
    margin: "ml-8",
    blur: "blur-sm",

  },
  {
    body: "Never experienced something like this before.",
    img: "https://avatar.vercel.sh/leo",
    margin: "ml-32",
    blur: "blur-sm",

  },
  {
    body: "Absolutely breathtaking!",
    img: "https://avatar.vercel.sh/emma",
    margin: "ml-10",
    blur: "blur-sm",

  },
];

const firstRow = reviews.slice(0, reviews.length / 2);
const secondRow = reviews.slice(reviews.length / 2);

const ReviewCard = ({ img, body, margin, blur }) => {
  return (
    <figure
      className={`items-center h-fit w-60 cursor-pointer overflow-hidden rounded-xl p-2 bg-secondary/10 hover:bg-secondary/20 border border-secondary/10 ${margin} ${blur} hover:blur-0 transition-all duration-500`}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <blockquote className="text-sm text-white/80">{body}</blockquote>
      </div>
    </figure>
  );
};

export function ChatsBackground() {
  return (
    <div className="relative grid h-[500px] w-full items-center justify-start overflow-hidden opacity-40">
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:30s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover className="[--duration:30s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <Marquee pauseOnHover reverse className="[--duration:30s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} {...review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
