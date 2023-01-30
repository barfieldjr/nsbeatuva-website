import react, { useState, useEffect } from "react";
import Hero from "../Hero/Hero";
import EventsPageCard from "../EventsPageCard/EventsPageCard";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase/Firebase";

export default function Home() {
  const [upcomingEvent, setUpcomingEvent] = useState([]);
  const currentTime = Date.now();

  const getEvents = async () => {
    const docRef = doc(db, "upcoming-events", "upcoming");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUpcomingEvent(docSnap.data().events[docSnap.data().events.length - 1]);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  // require('tailwind-scrollbar-hide')
  return (
    <div className="snap-y snap-mandatory overflow-y-auto overflow-x-hidden w-screen overscroll-none snap-center h-screen scrollbar-hide">
      {/* // <div className="snap-y snap-mandatory overflow-hidden snap-center h-screen border border-uva-orange"> */}
      <div className="snap-center h-screen bg-shapes bg-bottom ">
        <div className="md:mx-auto ">
          <Hero />
        </div>
      </div>
      <div className="snap-center h-screen bg-shapes bg-bottom flex flex-col my-auto hqd:hidden">
        <div className="md:mx-auto mt-20 hqd:my-auto lqd:scale-90 lqd:mt-12">
          <EventsPageCard
            title={upcomingEvent.title}
            caption={upcomingEvent.caption}
            hashtags={upcomingEvent.hashtags}
            eventDate={upcomingEvent.eventDate}
            key={upcomingEvent.title}
            image={upcomingEvent.image}
          />
        </div>
      </div>
      <div className="snap-center h-screen bg-shapes bg-bottom flex flex-row mx-auto w-screen lqd:hidden">
        <div className="flex flex-row h-screen w-screen md:max-w-screen-lg mx-auto ">
          <div className="flex flex-col mx-auto w-screen ">
            <div className="text-white h-10 text-4xl md:text-6xl font-bold mx-auto flex flex-row">
              <div className="mx-auto flex flex-row 2xl:hidden hqd:mt-36 w-screen ">
                <div className="mx-auto text-uva-orange text-5xl mt-28 flex flex-row lqd:hidden">
                  <div>Next Event</div>
                  <div className="ml-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-10 w-10 md:h-14 md:w-14"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="white"
                      strokeWidth={2}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            {/* this  */}

            <div className="2xl:flex md:mt-10 flex-row h-screen mx-auto items-center ">
              {" "}
              <div className="invisible 2xl:visible flex flex-col md:w-[500px]">
                {" "}
                <div className="text-6xl font-extrabold text-white mx-10">
                  Join us at our
                </div>
                <div className="text-6xl font-extrabold text-uva-orange mx-10">
                  next event!
                </div>
              </div>
              <div className="w-screen md:w-auto my-auto flex items-center ">
                {}
                <div className="mx-auto scale-75 lg:scale-90 2xl:scale-100">
                  <EventsPageCard
                    title={upcomingEvent.title}
                    caption={upcomingEvent.caption}
                    hashtags={upcomingEvent.hashtags}
                    eventDate={upcomingEvent.eventDate}
                    key={upcomingEvent.title}
                    image={upcomingEvent.image}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
