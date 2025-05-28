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
                  "https://scontent-iad3-1.xx.fbcdn.net/v/t1.30497-1/84628273_176159830277856_972693363922829312_n.jpg?stp=dst-jpg_p720x720_tt6&_nc_cat=1&ccb=1-7&_nc_sid=7565cd&_nc_ohc=F6fzqlEWMIkQ7kNvwEVEKW1&_nc_oc=AdneT7XcJaBPje5GvX2TPvQfLqv1a6egtfQ6iu0mDERuTDAjYfskzXCRyywxRA3Y274&_nc_zt=24&_nc_ht=scontent-iad3-1.xx&edm=AP4hL3IEAAAA&oh=00_AfL710hphFdQ2FOFw7N_aPlp7B5zQNOE3INsviUMof9cmg&oe=685F0A59"
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
