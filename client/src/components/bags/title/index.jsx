import React from "react";

export default function index() {
  return (
    <div className="">
      <div className="d-flex flex-row justify-content-between">
        <p>Participated people (512,000)</p>
        <div className="d-flex flex-row">
          <p
            style={{
              marginRight: "30px",
            }}
            className="d-none d-lg-block"
          >
            Hide Filters <i class="fa fa-filter" aria-hidden="true"></i>
          </p>
          <p
            style={{
              marginRight: "30px",
            }}
          >
            Sort <i class="fa fa-sort" aria-hidden="true"></i>
          </p>
        </div>
      </div>
    </div>
  );
}
