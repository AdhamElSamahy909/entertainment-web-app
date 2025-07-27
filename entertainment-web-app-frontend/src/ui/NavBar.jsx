import NavItem from "./NavItem";

function NavBar() {
  const destinations = ["/", "/movies", "/tvseries", "/bookmarked"];

  return (
    <aside className="flex flex-shrink-0 sm:w-full justify-between items-center p-[1.25rem] xl:flex-col xl:w-[6rem] xl:h-full sm:rounded-[0.625rem] xl:rounded-[1.25rem] bg-accent">
      <img
        src="/assets/logo.svg"
        className="h-[1.25rem] w-[1.5rem] sm:w-[2rem] sm:h-[1.5rem]"
        alt="logo"
      />

      <nav className="flex text-center xl:flex-col xl:mt-[-23rem] xl:py-[9rem] justify-center items-center h-[1rem] gap-[1.5rem]">
        {destinations?.map((destination) => (
          <NavItem
            className="flex-1"
            key={destination}
            destination={destination}
          />
        ))}
      </nav>

      <img
        src="/assets/image-avatar.png"
        className="w-[1.5rem] h-[1.5rem] sm:w-[2rem] sm:h-[2rem]"
        alt=""
      />
    </aside>
  );
}

export default NavBar;
