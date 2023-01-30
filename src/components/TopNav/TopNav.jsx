import { useState, useEffect } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import nsbeLogo from "./nsbelogo.png";
import rotunda from "./uvaRotunda.png";
import { Link } from "react-router-dom";

export default function TopNav() {
  const [openNav, setOpenNav] = useState(false);

  const instagram = () => {
    window.open("https://www.instagram.com/nsbeatuva/");
  };

  useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);

  const navList = (
    <ul className="mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        className="p-5 font-bold text-white hover:scale-150 hover:duration-300"
      >
        <Link
          to="/events"
          onClick={() => {
            setOpenNav(false);
          }}
          className="flex items-center"
        >
          Events
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-5 font-bold text-white hover:scale-150 hover:duration-300"
      >
        <Link
          to="/exec"
          onClick={() => {
            setOpenNav(false);
          }}
          className="flex items-center"
        >
          Exec
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        className="p-5 font-bold text-white hover:scale-150 hover:duration-300"
      >
        <Link
          to="/join"
          onClick={() => {
            setOpenNav(false);
          }}
          className="flex items-center"
        >
          Join
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar className=" bg-gray-900 fixed z-50 top-0 overscroll-none bg-opacity-5 border-b-uva-orange border-t-uva-orange border-l-transparent border-r-transparent bg-uva-orange mx-auto max-w-screen-5xl py-2 px-4 lg:px-8 lg:py-4 rounded-sm">
      <div className="container mx-auto flex items-center justify-between text-blue-gray-900">
        <Link
          to="/"
          onClick={() => {
            setOpenNav(false);
          }}
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
        >
          <div className="flex flex-row ">
            <img src={nsbeLogo} className="h-14 mx-5" />
            <span className="font-extrabold text-2xl text-white mt-3">x</span>
            <img src={rotunda} className="h-10 mx-5 mt-2" />
          </div>
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <Button
          size="sm"
          className="hidden lg:inline-block bg-transparent shadow-transparent hover:shadow-transparent hover:scale-125 hover:duration-200"
          onClick={instagram}
        >
          <span>
            <svg
              fill="white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="50px"
              height="50px"
            >
              {" "}
              <path d="M 8 3 C 5.243 3 3 5.243 3 8 L 3 16 C 3 18.757 5.243 21 8 21 L 16 21 C 18.757 21 21 18.757 21 16 L 21 8 C 21 5.243 18.757 3 16 3 L 8 3 z M 8 5 L 16 5 C 17.654 5 19 6.346 19 8 L 19 16 C 19 17.654 17.654 19 16 19 L 8 19 C 6.346 19 5 17.654 5 16 L 5 8 C 5 6.346 6.346 5 8 5 z M 17 6 A 1 1 0 0 0 16 7 A 1 1 0 0 0 17 8 A 1 1 0 0 0 18 7 A 1 1 0 0 0 17 6 z M 12 7 C 9.243 7 7 9.243 7 12 C 7 14.757 9.243 17 12 17 C 14.757 17 17 14.757 17 12 C 17 9.243 14.757 7 12 7 z M 12 9 C 13.654 9 15 10.346 15 12 C 15 13.654 13.654 15 12 15 C 10.346 15 9 13.654 9 12 C 9 10.346 10.346 9 12 9 z" />
            </svg>
          </span>
        </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          {openNav ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-6 w-6"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </IconButton>
      </div>
      <MobileNav open={openNav}>{navList}</MobileNav>
    </Navbar>
  );
}
