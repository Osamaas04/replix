export default function Headline() {
  return (
    <div className="font-raleway relative bg-primary h-screen overflow-hidden" >
      <div className="absolute -left-1/2 top-1/2 aspect-[1/0.7] w-[200%] rounded-[50%] shadow-[0_-150px_300px_0_rgba(255,204,0,0.1)]">
        <div className="grid justify-center items-center gap-6 sm:gap-10 mt-24" >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-secondary text-center" >
          AI-Driven Responses,<br className="hideen sm:block"/> Human-Like Accuracy
          </h1>

          <h3 className="text-[0.775rem] sm:text-base md:text-lg text-center text-secondary/70 h-24 leading-relaxed" >
          Witness how our AI adapts to customer inquiries,<br /> providing intelligent solutions that feel personal and real.
          </h3>
        </div>
      </div>
    </div>
  );
}
