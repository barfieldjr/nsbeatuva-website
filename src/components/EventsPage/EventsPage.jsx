import React, { useState, useEffect } from "react";
import EventsPageCard from "../EventsPageCard/EventsPageCard";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase/Firebase";
import EventPageHero from "../EventPageHero/EventPageHero";

const EventsPage = () => {
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const currentTime = Date.now();

  const getEvents = async () => {
    const docRef = doc(db, "upcoming-events", "upcoming");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUpcomingEvents(docSnap.data().events);
      console.log(docSnap.data().events);
      const test = docSnap.data().events[0].eventDate.toDate().getTime();
      console.log(test);
      console.log(Date.now());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getEvents();
  }, []);

  return (
    <div className="h-screen snap-y snap-mandatory ">
      <div className="h-screen snap-center bg-shapes flex lqd:hidden">
        <div className="text-white my-auto mx-auto flex flex-col lqd:mt-20">
          <div className="lqd:hidden font-bold flex flex-row text-2xl duration-500 lg:text-5xl  hqd:mb-10 mx-auto rounded-lg">
            <EventPageHero />
          </div>
          <div className="flex flex-row flex-wrap">
            <div className="mx-auto">{/* <EventsPageCard /> */}</div>
          </div>
        </div>
      </div>
      {upcomingEvents
        .slice()
        .reverse()
        .map((event) => (
          <div className="h-screen snap-center bg-shapes my-auto flex ">
            <div className="text-white my-auto mx-auto flex lqd:mt-14 mt-28 flex-col max-w-screen-5xl w-full">
              <div>
                <div className="flex flex-col space-x-5 lqd:scale-90">
                  <div className="mx-auto">
                    <EventsPageCard
                      title={event.title}
                      caption={event.caption}
                      hashtags={event.hashtags}
                      image={event.image}
                      eventDate={event.eventDate}
                      key={event.title}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default EventsPage;
