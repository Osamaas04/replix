import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/dashboard/sub/account/ui/avatar";

export default function AssignedMessages({
  caseNumber,
  platform,
  name,
  text,
  profilePicture,
  onClick,
  isSelected,
}) {
  return (
    <div
      className={`border border-secondary/70 rounded-md p-4 h-[8.5rem] cursor-pointer ${
        isSelected ? "bg-secondary/10" : ""
      }`}
      onClick={onClick}
    >
      <div className="grid gap-2">
        <div className="flex items-center justify-between">
          <p className="text-secondary/70 text-sm">{caseNumber}</p>
          <div className="flex items-center gap-2">
            <svg
              role="img"
              viewBox="0 0 24 24"
              width={18}
              height={18}
              fill="#fff"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Instagram SVG path */}
              <path d="..." />
            </svg>
            <h1 className="text-secondary text-sm">{platform}</h1>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>
            <Avatar className="w-8 h-8">
              <AvatarImage
                src={
                  `${profilePicture}` ||
                  `https://api.dicebear.com/9.x/glass/svg?seed=${name}`
                }
                alt={name}
              />
              <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <p className="text-secondary text-sm">{name}</p>
          </div>
        </div>
        <div>
          <div>
            <p className="text-secondary text-sm line-clamp-2">{text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
