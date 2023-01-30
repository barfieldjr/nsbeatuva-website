import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, logInWithGoogle, logout } from "../Firebase/Firebase";

export const Login = () => {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

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
        logout();
        alert("You do not have access to internal tools");
      } else {
        console.log("In database");
        navigate("/internal/dashboard");
      }
    }
  }, [user, loading]);

  return (
    <div className="bg-shapes">
      <body>
        <div class="flex items-center min-h-screen mx-3 rounded-lg">
          <div class="flex-1 h-full max-w-lg mx-auto bg-white bg-opacity-5 backdrop-blur-md rounded-lg shadow-xl border-2 border-uva-blue">
            <div class="flex flex-col md:flex-row rounded-lg border">
              <div class="flex items-center justify-center p-6 sm:p-12 w-full mx-auto">
                <div class="w-full">
                  <div class="flex justify-center">
                    <svg
                      class="w-20 h-20 text-uva-orange"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M12 14l9-5-9-5-9 5 9 5z" />
                      <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                      />
                    </svg>
                  </div>
                  <h1 class="mb-4 text-2xl font-bold text-center text-gray-700">
                    Internal Login
                  </h1>
                  <hr class="my-8" />
                  <button
                    class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-red-600 border border-transparent rounded-lg active:bg-red-600 hover:bg-red-700 focus:outline-none focus:shadow-outline-blue"
                    onClick={logInWithGoogle}
                  >
                    Login with Google
                  </button>
                  <button
                    class="block w-full px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-150 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                    onClick={() => {
                      alert(
                        "We will be adding support for Class of 2026 and onward graduates soon "
                      );
                    }}
                  >
                    Login with Outlook
                  </button>{" "}
                  <div class="flex items-center justify-center gap-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </body>
    </div>
  );
};
