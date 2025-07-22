import NavBarButton from "./NavBarButton";

type NavBarprops = {
  isHomeActive?: boolean;
  isSignInActive?: boolean;
};

const NavBar = ({ isHomeActive, isSignInActive }: NavBarprops) => {
  return (
    <div className={"w-full h-[70px]"}>
      <div
        className={
          "h-full flex flex-row justify-between items-center mx-[100px]"
        }
      >
        <div className={"grow-15 px-2"}>
          <h4
            className={
              "font-bold bg-gradient-to-r from-g-start to-g-end bg-clip-text text-transparent"
            }
          >
            CVScreen
          </h4>
        </div>
        <div className={"flex-auto"}></div>
        <div className={"grow-1 px-2"}>
          <div className="h-full flex flex-row justify-between items-center">
            {isHomeActive && (
              <div className="flex-auto flex justify-end ">
                <NavBarButton btnText="Home" pathName="/" />
              </div>
            )}
            {isSignInActive && (
              <div className="flex-auto flex justify-end ">
                <NavBarButton btnText="Sign In" pathName="/login" />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
