import React from "react";
import "./TopFold.css";

import bgVideo from "../assets/videos/nikiapp_landingpage_video.mp4";
import nikiAltLogo from "../assets/images/nikiapp_alternatetransplogo_2.png";
import nikiSubmark from "../assets/images/nikiapp_submark_smalltransp_2.png";

const TopFold = () => {
  return (
    <section className="topfold" aria-label="Top fold">
      <div className="topfold-bg" aria-hidden="true">
        <video
          className="topfold-bgVideo"
          src={bgVideo}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          tabIndex={-1}
        />

        <div className="topfold-edge top" />
        <div className="topfold-edge bottom" />
      </div>

      <div className="topfold-content">
        <img
          className="topfold-submark"
          src={nikiSubmark}
          alt="NIKI submark"
          draggable={false}
        />
        <nav className="topfold-nav" aria-label="Primary">
          <button className="topfold-navItem" type="button" onClick={() => {}}>
            LOGIN
          </button>

          <button className="topfold-navItem" type="button" onClick={() => {}}>
            SHOP
          </button>

          <button className="topfold-navItem" type="button" onClick={() => {}}>
            CONTACT
          </button>
        </nav>
                <img
          className="topfold-logo"
          src={nikiAltLogo}
          alt="NIKI"
          draggable={false}
        />

        <div className="topfold-tagline" aria-label="Tagline">
          <div className="topfold-taglineBox">
            <div className="topfold-taglineLine">
              Meticulously Planned Mediterranean Guides.
            </div>
            <div className="topfold-taglineLine">
              Aesthetic travel, efficient strategy.
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TopFold;
