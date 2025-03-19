import { Marquee } from "../ui/marquee";

const reviews = [
  {
    body: "I've never seen anything like this before",
    img: "https://avatar.vercel.sh/jack",
    margin: "ml-20",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "I don't know what to say.",
    img: "https://avatar.vercel.sh/jill",
    margin: "ml-36",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "I'm at a loss for words.",
    img: "https://avatar.vercel.sh/john",
    margin: "ml-12",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "This is absolutely incredible!",
    img: "https://avatar.vercel.sh/alex",
    margin: "ml-24",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "A truly amazing experience.",
    img: "https://avatar.vercel.sh/sam",
    margin: "ml-16",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "I can't stop thinking about this.",
    img: "https://avatar.vercel.sh/mia",
    margin: "ml-40",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "I'm inspired beyond words.",
    img: "https://avatar.vercel.sh/ryan",
    margin: "ml-28",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "This made my day!",
    img: "https://avatar.vercel.sh/lisa",
    margin: "ml-8",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "Never experienced something like this before.",
    img: "https://avatar.vercel.sh/leo",
    margin: "ml-32",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
  {
    body: "Absolutely breathtaking!",
    img: "https://avatar.vercel.sh/emma",
    margin: "ml-10",
    blur: "blur-sm",
    unBlur: "blur-0"
  },
];


const ReviewCard = ({ img, body, margin, blur, unBlur }) => {
  return (
    <figure
      className={`relative h-full w-60 cursor-pointer overflow-hidden rounded-xl p-4 transition-all duration-300 ease-in-out backdrop-blur-md hover:backdrop-blur-none bg-secondary/10 hover:bg-secondary/20 border border-white/10 ${margin} ${blur} hover:${unBlur}`}
    >
      <div className="flex flex-row items-center gap-2">
        <img className="rounded-full" width="32" height="32" alt="" src={img} />
        <blockquote className="mt-2 text-sm text-white/80">{body}</blockquote>
      </div>
    </figure>
  );
};

export function ChatsBackgroundRight() {
  return (
    <div className="relative flex h-[600px] w-full items-center justify-end overflow-hidden opacity-40">
      <Marquee pauseOnHover vertical className="[--duration:40s]">
        {reviews.map((review, index) => (
          <ReviewCard
            key={index}
            img={review.img}
            name={review.name}
            username={review.username}
            body={review.body}
            margin={review.margin}
            blur={review.blur}
            unBlur={review.unBlur}
          />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-1/4 bg-gradient-to-b from-background"></div>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-background"></div>
    </div>
  );
}
