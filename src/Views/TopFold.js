import React,{useEffect,useRef} from "react";
import "./TopFold.css";

import bgVideo from "../assets/videos/nikiapp_landingpage_video.mp4";
import nikiAltLogo from "../assets/images/nikiapp_alternatetransplogo_2.png";
import nikiSubmark from "../assets/images/nikiapp_submark_smalltransp_2.png";

import Shop from "../components/Shop";
import ShopGallery from "./ShopGallery";

const TopFold = () => {
  const socialRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0,0);
  },[]);

  const scrollToShop = () => {
    const el = document.getElementById("shopGallery");
    if(!el){
      return;
    }

    const startY = window.scrollY;
    const targetY = Math.round(el.getBoundingClientRect().top + window.scrollY);
    const delta = targetY - startY;

    const duration = 1800;
    const easeInCubic = (t) => t * t * t;

    const startTime = performance.now();

    const tick = (now) => {
      const elapsed = now - startTime;
      const t = Math.min(1,elapsed / duration);
      const eased = easeInCubic(t);

      window.scrollTo(0,Math.round(startY + delta * eased));

      if(t < 1){
        requestAnimationFrame(tick);
      }
    };

    requestAnimationFrame(tick);
  };

  return (
    <>
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

          {/* Invisible anchor so Shop can measure socialRef without icons being shown */}
          <div
            className="topfold-socialAnchor"
            aria-hidden="true"
            ref={socialRef}
          />

          <nav className="topfold-nav" aria-label="Primary" ref={navRef}>
            <button className="topfold-navItem" type="button" onClick={() => {}}>
              LOGIN
            </button>

            <button
              className="topfold-navItem"
              type="button"
              onClick={() => {
                const el = document.getElementById("shopGallery");
                console.log("shopGallery found?",!!el);
                if(el){
                  el.scrollIntoView({behavior:"smooth",block:"start"});
                  
                }
              }}
            >
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

        {/* Moved DOWN so refs definitely exist before Shop measures */}
        <Shop socialRef={socialRef} navRef={navRef} />
      </section>

      <ShopGallery />
    </>
  );
};

export default TopFold;
