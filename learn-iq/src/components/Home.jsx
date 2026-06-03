import React from "react";

export const Home = () => {
  return (
    <>
      <div id="home" className="sm:flex sm:justify-between">
        <div className="text-white text-center mt-12 sm:mt-50 sm:px-20  ">
          <h1 className="font-bold text-4xl sm:text-5xl">Welcome to the</h1>
          <h1 className="font-bold text-4xl sm:text-5xl">Aptitude Test System</h1>
          <p className="">____________________________________</p>
          <div className="flex justify-center space-x-6 font-medium">
            <p>Prepare.</p>
            <p>Practice.</p>
            <p>Perform.</p>
          </div>
          <button className="relative overflow-hidden  min-h-8 min-w-20 bg-amber-400 text-white rounded mt-5  font-medium transition-colors duration-20  hover:bg-amber-500">
            Start Test
          </button>
        </div>
        <div>
          <img src="/src/assets/Student1.png" className="h-150 w-150 px-2 sm:pr-22" ></img>
        </div>
      </div>
     
    </>
  );
};
