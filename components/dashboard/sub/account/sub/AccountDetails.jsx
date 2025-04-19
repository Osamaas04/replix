export default function AccountDetails() {
  return (
    <div className="text-secondary w-auto lg:w-[68vw]">
      <form action="" className="grid grid-cols-2 gap-y-4">
        {/* Name */}
        <div className="col-span-2 flex items-center gap-4">
          <label htmlFor="Name" className="w-40">Name</label>
          <input
            type="text"
            name="Name"
            className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
          />
        </div>

        {/* Company Name */}
        <div className="col-span-2 flex items-center gap-4">
          <label htmlFor="Company Name" className="w-40">Company Name</label>
          <input
            type="text"
            name="Company Name"
            className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
          />
        </div>

        {/* Email */}
        <div className="col-span-2 flex items-center gap-4">
          <label htmlFor="Email" className="w-40">Email</label>
          <input
            type="text"
            name="Email"
            className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
          />
        </div>

        {/* Role */}
        <div className="col-span-2 flex items-center gap-4">
          <label htmlFor="Role" className="w-40">Role</label>
          <input
            type="text"
            name="Role"
            className="bg-primary rounded-md border border-secondary/20 px-4 py-1 focus:outline-0 placeholder:text-sm w-full"
          />
        </div>
      </form>
    </div>
  );
}
