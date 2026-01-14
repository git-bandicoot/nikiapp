import React from "react";
import "./Footer.css";

import naIcon from "../assets/images/nikiapp_submark_smalltransp_2.png";
import instaIcon from "../assets/images/nikiapp_instaphotoicon_v2.png";
import tiktokIcon from "../assets/images/nikiapp_tiktokphotoicon_v2.png";

const Footer = () => {
  const yearText = "Copyright 2020 - 2026.";
  const contactHref = "/contact";

  return (
    <footer className="footer" aria-label="Site footer">
      <div className="footer-inner">
        <div className="footer-left">
          <img className="footer-logo" src={naIcon} alt="NIKI mark" />
          <div className="footer-text">
            <div className="footer-line">
              Need support? Custom itinerary? Collaborate?{" "}
              <a className="footer-link" href={contactHref}>
                Contact Niki.
              </a>
            </div>
            <div className="footer-line">{yearText}</div>
          </div>
        </div>

        <div className="footer-right" aria-label="Social links">
          <a
            className="footer-social"
            href="https://www.tiktok.com/@nikiaesthetic_travel"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Niki Aesthetic Travel on TikTok"
          >
            <img className="footer-socialIcon" src={tiktokIcon} alt="" />
          </a>

          <a
            className="footer-social"
            href="https://www.instagram.com/nikkiscott_"
            target="_blank"
            rel="noreferrer noopener"
            aria-label="Nikki Scott on Instagram"
          >
            <img className="footer-socialIcon" src={instaIcon} alt="" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
