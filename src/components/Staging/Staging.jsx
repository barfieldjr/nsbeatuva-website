import React, { useState, useEffect } from "react";
import { Input, Textarea, Checkbox, Button } from "@material-tailwind/react";
import { db, storage } from "../Firebase/Firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logout } from "../Firebase/Firebase";

const Staging = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [file, setFile] = useState([]);
  const [title, setTitle] = useState("");
  const [caption, setCaption] = useState("");
  const [hashtags, setHashtags] = useState("");
  const [percent, setPercent] = useState(0);
  const [imageURLs, setImageURLs] = useState([]);
  const [www, setWWWW] = useState(false);
  const [igV, setIG] = useState(false);
  const [fb, setFB] = useState(false);
  const [twttr, setTWTTR] = useState(false);
  const [hiddenUpload, setHiddenUpload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [eventTime, setEventTime] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [user, error] = useAuthState(auth);

  const uploadGCP = () => {
    // Return a promise that will either resolve or emit an error
    return new Promise((resolve, reject) => {
      if (!file) {
        alert("Please upload an image first!");
      }

      const storageRef = ref(storage, `/posts/${file.name}`);

      // Receives the storage reference and the file to upload.
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const percent = Math.round(
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          );

          // update progress
          setPercent(percent);
        },
        // handle error
        (err) => console.log(err),
        () => {
          // download url
          getDownloadURL(uploadTask.snapshot.ref).then((Gurl) => {
            resolve(Gurl);
          });
        }
      );
    });
  };

  // set image pop-up
  useEffect(() => {
    if (images.length < 1) return;
    setHiddenUpload(!hiddenUpload);
    const newImageURLs = [];
    images.forEach((image) => newImageURLs.push(URL.createObjectURL(image)));
    setImageURLs(newImageURLs);
  }, [images]);
  // if not a current user, redirect to login screen

  // useEffect(() => {
  //   if (loading) return;
  //   if (!user) {
  //     return navigate("/login");
  //   }
  //   fetchUserName();
  // }, [user]);

  const handleTime = (e) => {
    setEventTime(e);
  };

  const handleDate = (e) => {
    setEventDate(e);
  };

  const createPost = async () => {
    setLoading(true);
    const gcpURLValue = await uploadGCP();

    const postParsedDate = Date.parse(
      eventDate + "T" + eventTime + ":00.000-04:00"
    );
    const stamp = Timestamp.fromMillis(postParsedDate);

    const stagedEvent = {
      image: gcpURLValue,
      title: title,
      caption: caption,
      hashtags: hashtags.split(" "),
      platforms: { www: www, ig: igV, fb: fb, twttr: twttr },
      eventDate: stamp,
    };

    await stagePost(stagedEvent);
    setUploaded(true);
    setLoading(false);
  };

  const stagePost = async (stagedEvent) => {
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, "staged-events"), {
      stagedEvent,
    });
    console.log("Document written with ID: ", docRef.id);
  };

  const onImageChange = (e) => {
    setImages([...e.target.files]);
    setFile(e.target.files[0]);
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

  return (
    <div className="h-screen md:h-screen bg-shapes flex flex-col">
      <div className="w-5/6 max-w-2xl lg:w-1/2 mx-auto my-10 mt-36 text-gray-300 lg:text-5xl font-extrabold text-2xl flex flex-col">
        <div className="mx-auto">Command Center</div>
        <hr className="mt-2"></hr>
      </div>
      {uploaded ? (
        <div className=" w-5/6 mx-auto lg:w-1/2 max-w-2xl border-2 rounded-3xl flex bg-uva-blue bg-opacity-40 ">
          <div className="flex flex-col items-center justify-center w-full h-full aspect-square">
            <div className="text-gray-300 font-bold text-6xl">Success</div>
            <div className="w-5/6 max-w-2xl lg:w-1/2 mx-auto my-10 text-gray-300 lg:text-5xl font-extrabold text-2xl flex flex-col">
              <div className="mx-auto text-gray-700">{title}</div>
              <hr className="mt-2"></hr>
            </div>
            <hr className="mt-2"></hr>
            <Link
              to="/internal/scheduling"
              className=" flex hover:scale-105 duration-500 w-5/6 max-w-2xl lg:w-1/2 mx-auto bg-blue-700 border rounded-lg h-10 text-lg font-extrabold text-white lqd:mb-10 mb-10"
            >
              <div className="m-auto">Schedule Post</div>
            </Link>
          </div>
        </div>
      ) : (
        <div>
          <div className=" w-5/6 mx-auto cursor-pointer lg:w-1/2 max-w-2xl border-2 rounded-3xl flex bg-uva-blue bg-opacity-40 backdrop-blur-lg hover:bg-opacity-60 cursor-pointer ">
            <div className="flex items-center justify-center w-full h-full aspect-square">
              <label className="flex flex-col w-full h-full hover:border-gray-300">
                {images.length == 0 ? (
                  <div className="flex flex-col items-center justify-center mx-auto my-auto md:mt-auto">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-12 h-12 text-gray-400 group-hover:text-gray-600"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <p className="pt-1 my-auto text-sm tracking-wider text-gray-400 group-hover:text-gray-600">
                      Select a photo
                    </p>
                  </div>
                ) : (
                  <div className="h-full w-full">
                    {imageURLs.map((imageSrc) => (
                      <img
                        key="image"
                        src={imageSrc}
                        className="rounded-3xl w-full h-full"
                      />
                    ))}
                  </div>
                )}
                <input
                  type="file"
                  className="opacity-0"
                  onChange={onImageChange}
                />
              </label>
            </div>
          </div>
          <div className="w-5/6 max-w-2xl lg:w-1/2 mx-auto my-10 bg-black bg-opacity-30 backdrop-blur-lg">
            <Input label="Title" onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div className="w-5/6 max-w-2xl lg:w-1/2 mx-auto backdrop-blur-lg">
            <Textarea
              label="Caption"
              onChange={(e) => setCaption(e.target.value)}
              className="bg-black bg-opacity-30"
            />
          </div>
          <div className="w-5/6 max-w-2xl lg:w-1/2 mx-auto mt-5 bg-black bg-opacity-30 backdrop-blur-lg">
            <Input
              label="Hashtags"
              onChange={(e) => setHashtags(e.target.value)}
            />
          </div>
          <div className="w-5/6 max-w-2xl lg:w-1/2 mx-auto backdrop-blur-lg">
            <input
              onChange={(e) => handleTime(e.target.value)}
              type="time"
              className="w-full max-w-2xl mx-auto cursor-pointer select-none bg-black border p-1 bg-opacity-20 rounded-md mt-5 font-bold text-gray-500"
            />
            <input
              onChange={(e) => handleDate(e.target.value)}
              type="date"
              id="start"
              className="w-full max-w-2xl mx-auto cursor-pointer select-none bg-black border p-1 bg-opacity-20 rounded-md mt-5 font-bold text-gray-500"
            />
          </div>
          <div className="w-5/6 max-w-2xl lg:w-1/2 mx-auto my-5 border rounded-lg flex flex-col bg-uva-blue bg-opacity-30 backdrop-blur-lg">
            <div className=" mt-2 w-1/2 mx-auto rounded text-bold text-white flex">
              <div className="mx-auto">Platforms</div>
            </div>
            <hr className="w-1/2 mx-auto"></hr>
            <div className="mx-auto flex flex-row lqd:flex-wrap text-white font-bold lg:my-10">
              <div className="flex flex-col border p-1 rounded-lg m-2 mt-5">
                <div className="mx-auto">WW</div>
                <Checkbox
                  onClick={() => {
                    setWWWW(!www);
                  }}
                  id="www"
                  color="orange"
                  ripple={true}
                />
              </div>
              <div className="flex flex-col border p-1 rounded-lg m-2 mt-5">
                <div className="mx-auto">IG</div>{" "}
                <Checkbox
                  onClick={() => {
                    setIG(!igV);
                  }}
                  id="ig"
                  color="red"
                  ripple={true}
                />
              </div>
              <div className="flex flex-col border p-1 rounded-lg m-2 mt-5">
                <div className="mx-auto">FB</div>
                <Checkbox
                  onClick={() => {
                    setFB(!fb);
                  }}
                  id="fb"
                  color="blue"
                  ripple={true}
                />
              </div>
              <div className="flex flex-col border p-1 rounded-lg m-2 mt-5">
                <div className="mx-auto">TW</div>{" "}
                <Checkbox
                  onClick={() => {
                    setTWTTR(!twttr);
                  }}
                  id="twttr"
                  color="blue"
                  ripple={true}
                />
              </div>
            </div>
          </div>
          <div className="max-w-2xl mx-auto flex ">
            {!loading ? (
              <div className="flex flex-col mx-auto w-full">
                <button
                  onClick={createPost}
                  className=" hover:scale-105 duration-500 w-full max-w-2xl lg:w-1/2 mx-auto bg-blue-700 border rounded-lg py-5 h-16 text-lg font-extrabold text-white lqd:mb-10 mb-10"
                >
                  Stage Post
                </button>
                <Link
                  to="/internal/dashboard"
                  className="flex hover:scale-105 duration-500 w-full max-w-2xl lg:w-1/2 mx-auto bg-white-700 border rounded-lg h-10 text-lg font-extrabold text-white lqd:mb-10 mb-10"
                >
                  <div className="mx-auto my-auto"> Return to Dashboard</div>
                </Link>
              </div>
            ) : (
              <button
                disabled
                className="flex mx-auto flex-row w-full max-w-2xl lg:w-1/2 mx-auto bg-blue-700 border rounded-lg py-5 h-16 text-lg font-extrabold text-white lqd:mb-10 mb-10"
              >
                <div className="mx-auto my-auto flex flex-row">
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
              </button>
            )}
          </div>
        </div>
      )}
      <div className="invisible">LQD</div>
    </div>
  );
};

export default Staging;
