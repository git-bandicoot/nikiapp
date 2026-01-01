import React,{useEffect,useState} from "react";
import "./Header.css";

import nikiAiLogo from "../assets/images/nikiapp_ailogo_v4_2.gif";
import nikiLandingArc from "../assets/images/nikiapp_landingpage_arc_v1_5.jpg";
import candleFlame from "../assets/images/flame-flicker.gif";

const Header = () => {
  const pad = (n) => String(n).padStart(2,"0");

  const getNow = () => {
    const d = new Date();
    return `${pad(d.getHours())}:${pad(d.getMinutes())}`;
  };

  const [time,setTime] = useState(getNow());

  useEffect(() => {
    const tick = () => setTime(getNow());
    tick();
    const id = setInterval(tick,1000 * 30);
    return () => clearInterval(id);
  },[]);

  return (
    <header className="header">
      <div className="header-frame">
        <div className="header-grid">
          <div className="header-left">
            <div className="arc-wrap">
              <img
                className="header-arch"
                src={nikiLandingArc}
                alt="Niki landing arc"
              />

              <img
                className="candle-flame"
                src={candleFlame}
                alt="Candle flame"
              />
            </div>
          </div>

          <div className="header-right">
            <div className="header-top">
              <h1 className="header-title">NīKI</h1>
              <p className="header-subtitle">TRAVEL AESTHETIC SPECIALIST</p>
            </div>

            <div className="header-centerLogo">
              <img className="header-logo" src={nikiAiLogo} alt="Niki AI logo" />
            </div>

            <div className="header-clock">{time}</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
