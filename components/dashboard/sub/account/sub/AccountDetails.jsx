export default function AccountDetails() {
  return (
    <div className="text-secondary w-auto lg:w-[68vw]">
      <form action="" className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-4">
          <label htmlFor="Name">Name</label>
          <input type="text" name="Name" className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-[20vw]"/>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="Company Name">Company Name</label>
          <input type="text" name="Company Name" className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-[20vw]"/>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="Email">Email</label>
          <input type="text" name="Email" className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-[20vw]"/>
        </div>
        <div className="flex items-center gap-4">
          <label htmlFor="Role">Role</label>
          <input type="text" name="Role" className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-[20vw]"/>
        </div>
      </form>
    </div>
  );
}
