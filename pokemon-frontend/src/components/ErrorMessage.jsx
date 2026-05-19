import React from "react";

const ErrorMessage = ({ error }) => {
  return (
    <div className="text-center mt-8">

      <p className="text-red-400 text-lg font-semibold">
        {error}
      </p>

    </div>
  );
};

export default ErrorMessage;