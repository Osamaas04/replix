import InstagramCard from "../sub/InstagramCard";
import MessengerCard from "../sub/MessengerCard";
import WhatsappCard from "../sub/WhatsappCard";
import XCard from "../sub/XCard";

export default function SocialCards() {
  return (
    <div>
      <div className="grid gap-4 px-4 py-12 lg:py-14 lg:pr-14 lg:pl-[19.5rem] w-auto">
        <div className="grid gap-2">
          <h1 className="text-secondary text-3xl font-semibold">Integrations</h1>
          <h3 className="text-secondary/70">
            Enhance Your Replix Experience by Connecting Your Apps.
          </h3>
        </div>
        <div className="grid lg:grid-cols-2 gap-4 w-auto lg:w-[68vw]">
          <MessengerCard />
          <InstagramCard />
          <WhatsappCard />
          <XCard />
        </div>
      </div>
    </div>
  );
}
