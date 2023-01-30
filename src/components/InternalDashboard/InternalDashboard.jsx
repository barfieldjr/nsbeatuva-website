import React from "react";
import { Link } from "react-router-dom";

export const InternalDashboard = () => {
  return (
    <div>
      {" "}
      <div className="bg-shapes">
        <body>
          <div class="flex items-center min-h-screen mx-3 rounded-lg">
            <div class="flex-1 h-full max-w-lg mx-auto  rounded-lg shadow-xl border-2 border-uva-blue">
              <div class="flex flex-col md:flex-row rounded-lg border bg-white bg-opacity-10 backdrop-blur-xl">
                <div class="flex items-center justify-center p-6 sm:p-12 w-full mx-auto">
                  <div class="w-full">
                    <h1 class="mb-4 text-2xl font-bold text-center text-gray-700">
                      Dashboard
                    </h1>
                    <hr class="my-8" />
                    <Link
                      class="block w-full font-extrabold hover:scale-105 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-500 bg-uva-orange border border-transparent rounded-lg active:bg-uva-orange hover:bg-uva-orange focus:outline-none focus:shadow-outline-blue"
                      to="/internal/staging"
                    >
                      Staging
                    </Link>
                    <Link
                      to="/internal/scheduling"
                      class="block w-full font-extrabold hover:scale-105 px-4 py-2 mt-4 text-sm font-medium leading-5 text-center text-white transition-colors duration-500 bg-blue-600 border border-transparent rounded-lg active:bg-blue-600 hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue"
                    >
                      Scheduling
                    </Link>{" "}
                    <div class="flex items-center justify-center gap-4"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </body>
      </div>
    </div>
  );
};
