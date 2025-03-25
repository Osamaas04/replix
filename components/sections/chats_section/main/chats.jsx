import ChatsAnimation from "../sub/ChatsAnimation";
import Headline from "../sub/Headline";

export default function Chats() {
  return(
    <div className="bg-primary grid gap-12" >
      <Headline />
      <div className="opacity-0" id="chats"/>
      <ChatsAnimation />
    </div>
  );
}