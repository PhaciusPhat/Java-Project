import React from "react";
import "./Loader.scss";

function Loader() {
  return (
    <>
      <div className="loader-bg">
        <div className="loader-container">
          <div className="loader"></div>
          <div className="loader2"></div>
          <div className="loader3"></div>
        </div>
      </div>
    </>
  );
}

export default Loader;
