import { Image } from "./image";
import React from "react";

export const Gallery = (props) => {
  const slicedData = props.data ? props.data.slice(0, 6) : [];

  return (
    <div id="portfolio" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Gallery</h2>
          <p>
          
          </p>
        </div>
        <div className="row">
          <div className="portfolio-items">
            {slicedData.length > 0 ? (
              slicedData.map((d, i) => (
                <div
                  key={`${d.title}-${i}`}
                  className="col-sm-6 col-md-4 col-lg-4"
                >
                  <Image
                    title={d.title}
                    largeImage={d.largeImage}
                    smallImage={d.smallImage}
                  />
                </div>
              ))
            ) : (
              <div>Loading...</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
