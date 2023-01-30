import React, { useState, useEffect } from "react";
import { Select, Option } from "@material-tailwind/react";
import { db } from "../Firebase/Firebase";
import { Typography } from "@material-tailwind/react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  deleteDoc,
  Timestamp,
  addDoc,
} from "firebase/firestore";
import "tw-elements";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../Firebase/Firebase";
import { Link, useNavigate } from "react-router-dom";

export const Scheduling = () => {
  const navigate = useNavigate();
  const [confirmationPageOpen, setConfirmationPageOpen] = useState(false);
  const [postName, setPostName] = useState("Finalize Post");
  const [postImageURL, setPostImageURL] = useState("");
  const [postTime, setPostTime] = useState("");
  const [postDate, setPostDate] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [posts, setPosts] = useState([]);
  const [platforms, setPlatforms] = useState("");
  const [dataMap, setDataMap] = useState({});
  const [loading, setLoading] = useState(false);
  const [scheduled, setScheduled] = useState(false);
  const [postId, setPostId] = useState("");
  const [user, error] = useAuthState(auth);
  const [postCaption, setCaption] = useState(
    "Material Tailwind is an easy to use components library for Tailwind CSS and Material Design. It provides a simple way to customize your components, you can change the colors, fonts, breakpoints and everything you need."
  );
  const [preppedPostId, setPreppedPostId] = useState("");

  const fetchData = async () => {
    const querySnapshot = await getDocs(collection(db, "staged-events"));
    const postsArray = [];
    const dataMapBuilder = {};
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      if (!(doc.id in postsArray)) {
        postsArray.push(doc.id);
        dataMapBuilder[doc.id] = doc.data();
      }
    });
    setPosts(postsArray);
    setDataMap(dataMapBuilder);
  };

  const schedulePost = async () => {
    setLoading(true);

    const postParsedDate = Date.parse(
      postDate + "T" + postTime + ":00.000-04:00"
    );
    const stamp = Timestamp.fromMillis(postParsedDate);

    const scheduledPost = {
      id: postId,
      performAt: stamp,
      platforms: platforms,
      status: "scheduled",
    };

    console.log(scheduledPost);
    await uploadPost(scheduledPost);
    setScheduled(true);
    setLoading(false);
  };

  const uploadPost = async (post) => {
    await addDoc(collection(db, "scheduled-events"), post);
  };

  const setPostValue = (id) => {
    setPreppedPostId(id);
  };

  const handleTime = (e) => {
    setPostTime(e);
    console.log(postTime);
  };

  const handleDate = (e) => {
    setPostDate(e);
    console.log(postDate);
  };

  const authUsers = {
    "cdb8da@virginia.edu": true,
    "nsbeatuva.telecommunications@gmail.com": true,
  };

  useEffect(() => {
    if (loading) {
      // maybe trigger a loading screen
      return;
    }

    if (user) {
      console.log(user.email);
      console.log(authUsers);
      if (!(user.email in authUsers)) {
        console.log("Not in database");
        navigate("/");
        logout();
      } else {
        console.log("In database");
      }
    }

    if (!user) {
      navigate("/");
    }
  }, []);

  const getPostValue = async () => {
    setPostName(preppedPostId.stagedEvent.title);
    setCaption(preppedPostId.stagedEvent.caption);
    setHashtags(preppedPostId.stagedEvent.hashtags);
    setPostImageURL(preppedPostId.stagedEvent.image);
    setPlatforms(preppedPostId.stagedEvent.platforms);
    let builderPlatforms = [];
    Object.keys(preppedPostId.stagedEvent.platforms).map((tag) => {
      if (preppedPostId.stagedEvent.platforms[tag]) {
        builderPlatforms.push(tag);
      }
    });
    setPlatforms(builderPlatforms);
  };

  useEffect(() => {
    fetchData();
    getPostValue();
  }, [preppedPostId]);

  return (
    <div>
      {" "}
      {!scheduled ? (
        <div className="mt-28">
          {!confirmationPageOpen ? (
            <div className="bg-shapes">
              <body>
                <div class="flex items-center min-h-screen  mx-3 rounded-lg">
                  <div class="flex-1 h-full max-w-lg mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl border-2 border-uva-blue">
                    <div class="flex flex-col md:flex-row rounded-lg border">
                      <div class="flex items-center justify-center p-6 sm:p-12 w-full mx-auto">
                        <div class="w-full">
                          <h1 class="mb-4 text-2xl font-bold text-center text-gray-700">
                            {postName}
                          </h1>
                          <hr class="my-8" />
                          <Select label="Select Post" className="mb-5">
                            {posts.map((doc) => (
                              <Option
                                onClick={() => {
                                  setPostValue(dataMap[doc]);
                                  setPostId(doc);
                                  getPostValue();
                                }}
                              >
                                {dataMap[doc].stagedEvent.title}
                              </Option>
                            ))}
                          </Select>
                          <input
                            onChange={(e) => handleTime(e.target.value)}
                            type="time"
                            className="w-full cursor-pointer select-none bg-transparent border p-1 rounded-md mt-5 font-bold text-gray-500"
                          />
                          <input
                            onChange={(e) => handleDate(e.target.value)}
                            type="date"
                            id="start"
                            className="w-full cursor-pointer select-none bg-transparent border p-1 rounded-md mt-5 font-bold text-gray-500"
                          />
                          <button
                            onClick={() => {
                              setConfirmationPageOpen(true);
                            }}
                            class="block w-full h-16 font-extrabold hover:scale-105 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-500 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                          >
                            View Post
                          </button>{" "}
                          <div class="flex items-center justify-center gap-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </body>
            </div>
          ) : (
            <div className="bg-shapes cursor-default">
              <body>
                <div class="flex items-center min-h-screen  mx-3 rounded-lg mb-10">
                  <div class="flex-1 h-full max-w-lg mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl border-2 border-uva-blue">
                    <div class="flex flex-col md:flex-row rounded-lg border">
                      <div class="flex items-center justify-center p-6 sm:p-12 w-full mx-auto">
                        <div class="w-full">
                          <h1 class="mb-4 text-2xl font-bold text-center text-gray-400">
                            {postName}
                          </h1>
                          <hr class="my-8" />
                          <img
                            className="aspect-square rounded-md"
                            src={postImageURL}
                          />
                          <h1 class="mb-4 text-2xl font-bold text-gray-400 my-5">
                            Caption
                          </h1>
                          <Typography className="border flex p-5 text-white font-bold rounded-md my-2">
                            {postCaption}
                          </Typography>
                          <h1 class="mb-4 text-2xl font-bold text-gray-400 my-5">
                            Platforms
                          </h1>
                          <Typography className="border flex p-5 text-white font-bold rounded-md my-2">
                            {platforms
                              ? platforms.map((tag) => (
                                  <div className="mx-1 bg-white bg-opacity-10 border rounded p-1">
                                    {tag}
                                  </div>
                                ))
                              : null}
                          </Typography>
                          <h1 class="mb-4 text-2xl font-bold text-gray-400 my-5">
                            Hashtags
                          </h1>
                          <Typography className="border flex p-5 text-white font-bold rounded-md my-2">
                            {hashtags
                              ? hashtags.map((tag) => (
                                  <div className="mx-1">{tag}</div>
                                ))
                              : null}
                          </Typography>
                          <h1 class="mb-4 text-2xl font-bold text-gray-400 my-5">
                            Date/Time
                          </h1>
                          <Typography className="border flex p-5 text-white font-bold rounded-md my-2">
                            {postDate} {postTime} EST
                          </Typography>
                          {!loading ? (
                            <div>
                              <button
                                onClick={() => {
                                  setConfirmationPageOpen(false);
                                }}
                                class="block w-full font-extrabold hover:scale-105 px-4 py-2 mt-10 text-sm font-medium h-10 leading-5 text-center text-white transition-colors duration-500 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                              >
                                Edit Post
                              </button>{" "}
                              <button class="block w-full font-extrabold hover:scale-105 px-4 py-2 mt-10 text-sm font-medium h-10 leading-5 text-center text-white transition-colors duration-500 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-blue">
                                Delete Staged Post
                              </button>{" "}
                              <button
                                onClick={schedulePost}
                                class="block w-full font-extrabold hover:scale-105 px-4 py-2 mt-10 text-sm h-16 font-medium leading-5 text-center text-white transition-colors duration-500 bg-uva-blue border border-white rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                              >
                                Confirm Post
                              </button>{" "}
                            </div>
                          ) : (
                            <button
                              disabled
                              class="block w-full font-extrabold px-4 py-2 mt-10 text-sm h-16 font-medium leading-5 text-center text-white transition-colors duration-500 bg-uva-blue border border-white rounded-lg active:bg-blue-600  focus:outline-none focus:shadow-outline-blue"
                            >
                              <div className="mx-auto my-auto flex flex-row">
                                <div className="flex mx-auto">
                                  {" "}
                                  <div>Creating Post</div>
                                  <svg
                                    role="status"
                                    className="w-8 h-6 my-auto ml-2 text-gray-200 animate-spin dark:text-gray-600 fill-purple-800"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                      fill="white"
                                    />
                                    <path
                                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                      fill="gray"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </button>
                          )}
                          <div class="flex items-center justify-center gap-4"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </body>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-28">
          <div className="bg-shapes cursor-default">
            <body>
              <div class="flex items-center min-h-screen  mx-3 rounded-lg mb-10">
                <div class="flex-1 h-full max-w-lg mx-auto bg-white bg-opacity-10 backdrop-blur-lg rounded-lg shadow-xl border-2 border-uva-blue">
                  <div class="flex flex-col md:flex-row rounded-lg border">
                    <div class="flex items-center justify-center p-6 sm:p-12 w-full mx-auto">
                      <div class="w-full">
                        <h1 class="mb-4 text-2xl font-bold text-center text-gray-400">
                          {postName}
                        </h1>
                        <hr class="my-8" />
                        <img
                          className="aspect-square rounded-md"
                          src={postImageURL}
                        />
                        <h1 class="mb-4 text-2xl font-bold text-gray-400 my-5">
                          Platforms
                        </h1>
                        <Typography className="border flex p-5 text-white font-bold rounded-md my-2">
                          {platforms
                            ? platforms.map((tag) => (
                                <div className="mx-1 bg-white bg-opacity-10 border rounded p-1">
                                  {tag}
                                </div>
                              ))
                            : null}
                        </Typography>
                        <h1 class="mb-4 text-2xl font-bold text-gray-400 my-5">
                          Date/Time
                        </h1>
                        <Typography className="border flex p-5 text-white font-bold rounded-md my-2">
                          {postDate} {postTime} EST
                        </Typography>
                        <div>
                          <div class="block w-full flex font-extrabold px-4 py-2 mt-10 text-sm h-16 font-medium leading-5 text-center text-white transition-colors duration-500 bg-green-700  rounded-lg active:bg-blue-600 focus:outline-none focus:shadow-outline-blue">
                            <div className=" m-auto text-2xl font-extrabold">
                              Successfully Scheduled
                            </div>
                          </div>{" "}
                        </div>

                        <div class="flex items-center justify-center gap-4"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </body>
          </div>
        </div>
      )}
    </div>
  );
};
