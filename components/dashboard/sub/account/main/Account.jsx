import AccountDetails from "../sub/AccountDetails";

export default function Account() {
  return (
    <div>
      <div className="grid gap-4 px-4 py-12 lg:py-14 lg:pr-14 lg:pl-[19.5rem] w-auto">
        <div className="grid gap-2">
          <h1 className="text-secondary text-3xl font-semibold">Account</h1>
          <h3 className="text-secondary/70">
            Manage your personal and company details with ease.
          </h3>
        </div>

        <AccountDetails />
      </div>
    </div>
  );
}
