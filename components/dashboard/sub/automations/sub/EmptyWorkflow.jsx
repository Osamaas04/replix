

export default function EmptyWorkflow({ icon: Icon, title }) {
  return (
    <div className="flex flex-col gap-8 justify-center items-center  rounded-md h-[20rem] my-auto">
      <div className="grid justify-self-center border border-primary border-dashed rounded-full p-8 w-fit h-fit">
        <Icon color="black"/>
      </div>

      <div className="grid justify-center">
        <h1 className="font-semibold text-center text-primary">{title}</h1>
      </div>
    </div>
  );
}
