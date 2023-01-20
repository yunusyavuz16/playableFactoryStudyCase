import React from "react";

const PageFooter = () => {
  return (
    <div className="d-flex flex-center flex-column-auto p-2 bg-light w-100 position-absolute bottom-0 ">
      <div className="d-flex align-items-center fw-bold fs-6">
        <span className="text-muted text-hover-primary px-2">
          <span>Yunus Yavuz</span> {new Date().getFullYear()}
        </span>
      </div>
    </div>
  );
};

export default PageFooter;
