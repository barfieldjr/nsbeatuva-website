import react, { useState, useEffect } from "react";

export default function EventsPageCard({
  title,
  caption,
  hashtags,
  eventDate,
  image,
}) {
  const [past, setPast] = useState(false);
  const [eventTime, setEventTime] = useState("");

  useEffect(() => {
    if (eventDate) {
      let currentTimeSec = Date.now();
      currentTimeSec = (currentTimeSec - (currentTimeSec % 1000)) / 1000;
      if (eventDate.seconds < currentTimeSec) {
        setPast(true);
      }

      const date = new Date(0); // The 0 there is the key, which sets the date to the epoch
      date.setUTCSeconds(eventDate.seconds);
      setEventTime(date.toLocaleString());
    }
  }, [eventDate]);

  return (
    <div className="mx-auto">
      {past ? (
        <div className="hqd:mx-5 mx-10 mt-5 hover:scale-105 duration-500 ">
          <div className="w-full h-full flex flex-row bg-white bg-opacity-20 backdrop-blur-lg rounded mb-5 p-2 border-double border-2 border-red-600 ">
            <div className="flex flex-row mx-auto">
              {" "}
              <div className="my-auto text-white font-bold text-xl">
                Past Event
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 my-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
                />
              </svg>
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white bg-opacity-20 backdrop-blur-2xl rounded-2xl border border-double ">
            <img className="w-full h-full" src={image} alt={title} />
            <div className="px-6 py-4 lqd:py-1">
              <div className="font-bold text-xl mb-2 text-white">{title}</div>
              <p className="text-white text-base lqd:text-sm">{caption}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {hashtags?.map((tag) => (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-default hover:scale-105 duration-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="hqd:mx-5 mx-10 mt-5 hover:scale-105 duration-500 ">
          <div className="w-full h-full flex flex-row bg-white bg-opacity-20 backdrop-blur-lg rounded mb-5 p-2 border-double border-2 border-uva-orange ">
            <div className="flex flex-row mx-auto">
              {" "}
              <div className="my-auto font-bold text-white text-xl">
                {eventTime}
              </div>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 ml-2 my-auto"
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
            </div>
          </div>
          <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white bg-opacity-20 backdrop-blur-2xl rounded-2xl border-2">
            <img className="w-full h-full" src={image} alt={title} />
            <div className="px-6 py-4 lqd:py-1">
              <div className="font-bold text-xl mb-2 text-white">{title}</div>
              <p className="text-white text-base lqd:text-sm">{caption}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              {hashtags?.map((tag) => (
                <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 cursor-default hover:scale-105 duration-500">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
