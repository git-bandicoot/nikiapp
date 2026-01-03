import React from "react";
import "./TopFold.css";

import nikiAiLogo from "../assets/images/nikiapp_ailogo_v4_2.gif";
import nikiLandingArc from "../assets/images/nikiapp_landingpage_arc_v1_5.jpg";
import candleFlame from "../assets/images/flame-flicker.gif";

const TopFold = () => {
  return (
    <section className="topfold-niki" aria-label="Top fold">
      <div className="topfold-shell">
        {/* LEFT ARCH */}
        <div className="topfold-left" aria-hidden="true">
          <div className="topfold-archFrame">
            <img
              className="topfold-archImg"
              src={nikiLandingArc}
              alt=""
            />
            <img
              className="topfold-flame"
              src={candleFlame}
              alt=""
            />
          </div>
        </div>

        {/* RIGHT COPY */}
        <div className="topfold-right">
          <div className="topfold-copy">
            <h1 className="topfold-wordmark">NIKI</h1>

            <p className="topfold-tag">
              TRAVEL ITINERARIES, CURATED IN SECONDS.
            </p>

            <div className="topfold-cta">
              <button className="topfold-btn topfold-btnLong" type="button">
                Get started
              </button>
            </div>

            {/* AI LOGO UNDER TEXT */}
            <div className="topfold-goldWrap" aria-hidden="true">
              <img
                className="topfold-goldLogo"
                src={nikiAiLogo}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopFold;
