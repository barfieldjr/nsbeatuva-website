import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Tooltip,
} from "@material-tailwind/react";
import testpost from "./testpost.png";

export default function EventCard() {
  return (
    <Card className="relative hover:cursor-pointer xl:hover:scale-105 duration-700 w-5/6 md:w-[600px] bg-opacity-30 backdrop-blur mx-auto h-4/5 max-h-[750px] md:max-h-[950px] flex">
      <div className="border h-24 my-4 mx-3 border-transparent grid grid-cols-3 gap-5 text-2xl ">
        <div className="bg-blue-700 rounded-lg flex flex-col hover:cursor-pointer hover:scale-110 duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto mt-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <div className="text-white font-bold mx-auto">11/16/2022</div>
        </div>
        <div className="bg-green-500 rounded-lg flex flex-col hover:cursor-pointer hover:scale-110 duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto mt-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <div className="text-white font-bold mx-auto">7:00 PM</div>
        </div>
        <div className="bg-red-400 rounded-lg flex flex-col hover:cursor-pointer hover:scale-110 duration-300">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 mx-auto mt-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="white"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          <div className="text-white font-bold mx-auto">THN 306</div>
        </div>
      </div>
      <CardHeader floated={false} className="">
        <img src={testpost} alt="profile-picture" className="border-2" />
      </CardHeader>
      <CardBody className="text-center">
        <Typography
          variant="h4"
          color="blue-gray"
          className="mb-2 font-extrabold text-2xl"
        >
          Career Fair
        </Typography>
        <Typography color="black" className="font-bold text-black" textGradient>
          Come see us, at the Career fair! Learn more about NSBE and join our
          mailing list!
        </Typography>
      </CardBody>
      <CardFooter className="flex justify-center gap-7 pt-2">
        <Tooltip content="Like">
          <Typography
            as="a"
            href="#facebook"
            variant="lead"
            color="blue"
            textGradient
          >
            <i className="fab fa-facebook" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#twitter"
            variant="lead"
            color="light-blue"
            textGradient
          >
            <i className="fab fa-twitter" />
          </Typography>
        </Tooltip>
        <Tooltip content="Follow">
          <Typography
            as="a"
            href="#instagram"
            variant="lead"
            color="purple"
            textGradient
          >
            <i className="fab fa-instagram" />
          </Typography>
        </Tooltip>
      </CardFooter>
    </Card>
  );
}
