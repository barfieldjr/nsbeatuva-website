import React, { useState, useEffect } from "react";
import ExecCard from "./../ExecCard/ExecCard";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../Firebase/Firebase";

const ExecPage = () => {
  const [execMembers, setExecMembers] = useState([]);

  const positionOrder = [
    "President",
    "Vice President",
    "Treasurer",
    "Secretary",
    "Programs Chair",
    "Corporate Liaison Chair",
    "Corporate Liason",
    "Graduate Student Liaison",
    "Parliamentarian",
    "Publications Chair",
    "Academic Excellence Chair",
    "Telecommunications Chair",
    "Conference Planning Chair",
    "Pre-College Initiative Chair",
  ];

  const getExec = async () => {
    const docRef = doc(db, "exec", "2023-2024");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setExecMembers(docSnap.data().members);
    } else {
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getExec();
  }, []);

  useEffect(() => {
    getExec();
  }, []);

  const sortedExecMembers = [...execMembers].sort((a, b) => {
    const positionA = a.position;
    const positionB = b.position;

    const indexA = positionOrder.indexOf(positionA);
    const indexB = positionOrder.indexOf(positionB);

    // If positionA is not in the list, push it down
    if (indexA === -1) return 1;

    // If positionB is not in the list, push it down
    if (indexB === -1) return -1;

    return indexA - indexB;
  });

  return (
    <div className="scroll-smooth bg-shapes scrollbar-hide">
      <div className="max-w-screen-xl flex flex-col mx-auto h-screen">
        <div className="mt-36 font-extrabold text-3xl text-white mx-4 bg-white bg-opacity-20 backdrop-blur p-3 rounded-lg flex flex-col">
          <div className="mx-auto">2023-2024</div>
          <div className="mx-auto">Executive Board</div>
        </div>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedExecMembers.map((member) => (
              <ExecCard
                name={member.name}
                position={member.position}
                profilePicture={member.profilePicture}
                bio={member.bio}
                linkedinUrl={member.linkedinUrl}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExecPage;
