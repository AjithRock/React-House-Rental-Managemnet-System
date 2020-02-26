import React from "react";

function PageNotFound() {
  return (
    <div id="notfound">
      <div className="notfound">
        <div className="notfound-404">
          <h1>404</h1>
        </div>
        <h2>Oops! Nothing was found</h2>
        <p style={{fontWeight: 200}}>
          The page you are looking for might have been removed had its name
          changed or is temporarily unavailable.{" "}
        </p>
      </div>
    </div>
  );
}

export default PageNotFound;
