import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFaceSadTear } from "@fortawesome/free-regular-svg-icons";

const Notfound = () => {
  useEffect(() => {
    document.title = `404 | Page Not Found`;
  }, []);

  return (
    <React.Fragment>
      <div className="not-found page-content">
        <div className="container text-center my-5">
          <div className="row justify-content-center">
            <div className="col-md-8 col-lg-6">
              <div className="card shadow-lg p-4">
                <div className="card-body">
                  <h1 className="display-4 text-danger">
                    Oops! <FontAwesomeIcon icon={faFaceSadTear} />
                  </h1>
                  <p className="lead">
                    We can't seem to find the page you're looking for.
                    <br />
                    The requested URL "{window.location.href}" was not found on
                    this server.
                  </p>
                  <a href="/" className="btn btn-primary mt-3">
                    Go back to the home page
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Notfound;
