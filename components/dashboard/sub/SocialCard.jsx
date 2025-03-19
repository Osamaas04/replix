import InstagramCard from "../integrations/InstagramCard";
import MessengerCard from "../integrations/MessengerCard";
import WhatsappCard from "../integrations/WhatsappCard";
import XCard from "../integrations/XCard";

export default function SocialCards() {
  return (
    <div>
      <div className="grid gap-4 p-14">
        <div className="grid gap-2">
          <h1 className="text-secondary text-3xl font-semibold">Integrations</h1>
          <h3 className="text-secondary/70">
            Enhance your Replix experience by connecting your apps.
          </h3>
        </div>
        <div className="grid lg:grid-cols-2 gap-4">
          <MessengerCard />
          <InstagramCard />
          <WhatsappCard />
          <XCard />
        </div>
      </div>
    </div>
  );
}
