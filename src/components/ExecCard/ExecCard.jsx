import { faker } from "@faker-js/faker";

export default function ExecCard({
  name,
  position,
  profilePicture,
  bio,
  linkedinUrl,
}) {
  return (
    <div className="hover:cursor-pointer xl:hover:scale-105 duration-500 w-full bg-white bg-opacity-20 backdrop-blur-lg rounded-lg shadow-lg overflow-hidden flex flex-col md:flex-row">
      <div className="w-full md:w-2/5 h-full">
        {profilePicture ? (
          <img
            className="object-center object-cover w-full h-full"
            src={profilePicture}
            alt="photo"
          />
        ) : (
          <img
            className="object-center object-cover w-full h-full"
            src={faker.image.avatar()}
            alt="photo"
          />
        )}
      </div>
      <div className="w-full md:w-3/5 text-left p-6 md:p-4 space-y-2  rounded-lg">
        <p className="text-xl text-white font-bold">{name}</p>
        <p className="text-base text-white font-normal">{position}</p>
        <p className="text-base leading-relaxed text-white font-normal text-xs">
          {!bio ? (
            <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem
              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
              tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum
              dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit
              amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua
            </div>
          ) : (
            <div>{bio}</div>
          )}
        </p>
        <div className="flex justify-start space-x-2">
          <a
            href={linkedinUrl ? linkedinUrl : "#"}
            className="text-white hover:text-gray-600"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-6 h-6"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}
