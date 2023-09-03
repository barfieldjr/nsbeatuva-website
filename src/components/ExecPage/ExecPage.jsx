import React, { useState, useEffect } from "react";
import ExecCard from "./../ExecCard/ExecCard";
import { faker } from "@faker-js/faker";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { db, auth } from "../Firebase/Firebase";

const ExecPage = () => {
  const [execMembers, setExecMembers] = useState([]);

  const getExec = async () => {
    const docRef = doc(db, "exec", "2023-2024");
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setExecMembers(docSnap.data().members);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    getExec();
  }, []);

  return (
    <div className="scroll-smooth bg-shapes scrollbar-hide">
      <div className="max-w-screen-xl flex flex-col mx-auto h-screen">
        <div className="mt-36 font-extrabold text-3xl text-white mx-4 bg-white bg-opacity-20 backdrop-blur p-3 rounded-lg flex flex-col">
          <div className="mx-auto">2023-2024</div>
          <div className="mx-auto">Executive Board</div>
        </div>
        <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {execMembers.map((member) => (
              <ExecCard
                name={member.name}
                position={member.position}
                profilePicture={member.profilePicture}
                bio={member.bio}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default ExecPage;
