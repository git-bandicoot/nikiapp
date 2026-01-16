import React,{useEffect,useRef,useState} from "react";
import "./TopFold.css";

import bgVideo from "../assets/videos/nikiapp_landingpage_video.mp4";
import nikiAltLogo from "../assets/images/nikiapp_alternatetransplogo_2.png";
import nikiSubmark from "../assets/images/nikiapp_submark_smalltransp_2.png";

import ShopGallery from "./ShopGallery";

import {doc,getDoc,setDoc,serverTimestamp} from "firebase/firestore";
import {db} from "../firebase";

const TopFold = () => {
  const socialRef = useRef(null);
  const navRef = useRef(null);

  const [subscribeMode,setSubscribeMode] = useState("idle"); // idle | banner | email | name | welcome | menu
  const [subscribeText,setSubscribeText] = useState("SUBSCRIBE");
  const [isFading,setIsFading] = useState(false);

  const [email,setEmail] = useState("");
  const [name,setName] = useState("");
  const [welcomeName,setWelcomeName] = useState("");

  const emailRef = useRef(null);
  const nameRef = useRef(null);

  const welcomeCooldownMs = 15000;
  const welcomeCooldownKey = "niki_welcome_click_disabled_until_v1";

  const nowMs = () => Date.now();

  const getWelcomeDisabledUntil = () => {
    const raw = localStorage.getItem(welcomeCooldownKey);
    const n = raw ? Number(raw) : 0;
    return Number.isFinite(n) ? n : 0;
  };

  const setWelcomeCooldown = () => {
    const until = nowMs() + welcomeCooldownMs;
    localStorage.setItem(welcomeCooldownKey,String(until));
  };

  const isWelcomeDisabled = () => nowMs() < getWelcomeDisabledUntil();

  useEffect(() => {
    window.scrollTo(0,0);
  },[]);

  useEffect(() => {
    const cached = localStorage.getItem("niki_subscriber_name_v1");
    if(cached){
      setWelcomeName(cached);
      setSubscribeMode("welcome");
      setSubscribeText(`WELCOME, ${cached}`);
    }
  },[]);

  useEffect(() => {
    if(subscribeMode === "email"){
      requestAnimationFrame(() => {
        if(emailRef.current){
          emailRef.current.focus();
        }
      });
    }

    if(subscribeMode === "name"){
      requestAnimationFrame(() => {
        if(nameRef.current){
          nameRef.current.focus();
        }
      });
    }
  },[subscribeMode]);

  const normalizeEmail = (raw) => String(raw || "").trim().toLowerCase();
  const isEmailValidish = (raw) => {
    const v = normalizeEmail(raw);
    if(!v){
      return false;
    }
    return v.includes("@") && v.includes(".");
  };

  const swapMode = (nextMode,nextText,delayMs=240) => {
    setIsFading(true);
    window.setTimeout(() => {
      setSubscribeMode(nextMode);
      if(typeof nextText === "string"){
        setSubscribeText(nextText);
      }
      setIsFading(false);
    },delayMs);
  };

  const startSubscribeFlow = () => {
    if(subscribeMode !== "idle"){
      return;
    }

    swapMode("banner","LIVE THE AESTHETIC");
    window.setTimeout(() => {
      setSubscribeMode("email");
    },520);
  };

  const openWelcomeMenu = () => {
    if(isWelcomeDisabled()){
      return;
    }

    if(subscribeMode !== "welcome"){
      return;
    }

    swapMode("menu",subscribeText);
  };

  const collapseMenu = () => {
    if(!welcomeName){
      swapMode("idle","SUBSCRIBE");
      return;
    }
    swapMode("welcome",`WELCOME, ${welcomeName}`);
  };

  const logoutSubscribe = () => {
    localStorage.removeItem("niki_subscriber_name_v1");
    setWelcomeName("");
    setEmail("");
    setName("");
    swapMode("idle","SUBSCRIBE");
  };

  const collapseToWelcome = (finalName) => {
    const clean = String(finalName || "").trim();
    if(!clean){
      return;
    }

    setWelcomeName(clean);
    localStorage.setItem("niki_subscriber_name_v1",clean);

    setWelcomeCooldown();

    swapMode("welcome",`WELCOME, ${clean}`,180);

    setEmail("");
    setName("");
  };

  const checkSubscriberByEmail = async (rawEmail) => {
    const cleanEmail = normalizeEmail(rawEmail);
    const ref = doc(db,"subscribers",cleanEmail);
    const snap = await getDoc(ref);
    return {exists:snap.exists(),data:snap.exists() ? snap.data() : null,cleanEmail};
  };

  const upsertSubscriber = async ({cleanEmail,displayName}) => {
    const ref = doc(db,"subscribers",cleanEmail);
    await setDoc(
      ref,
      {
        email:cleanEmail,
        displayName:String(displayName || "").trim(),
        updatedAt:serverTimestamp(),
        createdAt:serverTimestamp(),
      },
      {merge:true}
    );
  };

  const onEmailSubmit = async () => {
    const cleanEmail = normalizeEmail(email);

    if(!isEmailValidish(cleanEmail)){
      swapMode(subscribeMode,"ENTER A VALID EMAIL");
      window.setTimeout(() => {
        setSubscribeText("LIVE THE AESTHETIC");
      },900);
      return;
    }

    try{
      const res = await checkSubscriberByEmail(cleanEmail);

      // webhook placeholder:
      // await fetch("YOUR_WEBHOOK_URL",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:res.cleanEmail})});

      if(res.exists){
        const existingName = res.data?.displayName;
        if(existingName){
          collapseToWelcome(existingName);
          return;
        }

        setSubscribeMode("name");
        setSubscribeText("WHO DO YOU PREFER TO BE CALLED?");
        return;
      }

      setSubscribeMode("name");
      setSubscribeText("WHO DO YOU PREFER TO BE CALLED?");
    }catch(e){
      console.error("Subscribe email check failed:",e);
      swapMode(subscribeMode,"TRY AGAIN");
      window.setTimeout(() => {
        setSubscribeText("LIVE THE AESTHETIC");
      },900);
    }
  };

  const onNameSubmit = async () => {
    const cleanEmail = normalizeEmail(email);
    const cleanName = String(name || "").trim();

    if(!cleanName){
      swapMode(subscribeMode,"NAME REQUIRED");
      window.setTimeout(() => {
        setSubscribeText("WHO DO YOU PREFER TO BE CALLED?");
      },900);
      return;
    }

    try{
      await upsertSubscriber({cleanEmail,displayName:cleanName});
      collapseToWelcome(cleanName);
    }catch(e){
      console.error("Subscribe name save failed:",e);
      swapMode(subscribeMode,"TRY AGAIN");
      window.setTimeout(() => {
        setSubscribeText("WHO DO YOU PREFER TO BE CALLED?");
      },900);
    }
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

          <div
            className="topfold-socialAnchor"
            aria-hidden="true"
            ref={socialRef}
          />

          <nav className="topfold-nav" aria-label="Primary" ref={navRef}>
            <div
              className={[
                "topfold-subscribeWrap",
                (subscribeMode === "email" || subscribeMode === "name") ? "isActive" : "",
                isFading ? "isFading" : "",
              ].join(" ")}
            >
              {(subscribeMode === "idle" || subscribeMode === "banner") && (
                <button
                  className="topfold-navItem topfold-subscribeBtn"
                  type="button"
                  onClick={startSubscribeFlow}
                >
                  {subscribeText}
                </button>
              )}

              {subscribeMode === "welcome" && (
                <button
                  className="topfold-navItem topfold-subscribeBtn"
                  type="button"
                  onClick={openWelcomeMenu}
                  disabled={isWelcomeDisabled()}
                  aria-disabled={isWelcomeDisabled()}
                >
                  {subscribeText}
                </button>
              )}

              {subscribeMode === "menu" && (
                <div className="topfold-subscribeMenu" aria-label="Welcome menu">
                  <button
                    className="topfold-navItem"
                    type="button"
                    onClick={logoutSubscribe}
                  >
                    LOGOUT
                  </button>

                  <button
                    className="topfold-navItem topfold-collapseHint"
                    type="button"
                    onClick={collapseMenu}
                  >
                    COLLAPSE
                  </button>
                </div>
              )}

              {subscribeMode === "email" && (
                <div className="topfold-subscribeInline" aria-label="Subscribe email prompt">
                  <div className="topfold-subscribeLabel">LIVE THE AESTHETIC</div>

                  <input
                    ref={emailRef}
                    className="topfold-subscribeInput"
                    type="email"
                    value={email}
                    placeholder="your@email.com"
                    onChange={(e) => setEmail(e.target.value)}
                    onKeyDown={(e) => {
                      if(e.key === "Enter"){
                        onEmailSubmit();
                      }
                    }}
                    autoComplete="email"
                    inputMode="email"
                  />

                  <button
                    className="topfold-subscribeGo"
                    type="button"
                    onClick={onEmailSubmit}
                    aria-label="Submit email"
                  >
                    →
                  </button>
                </div>
              )}

              {subscribeMode === "name" && (
                <div className="topfold-subscribeInline" aria-label="Subscribe name prompt">
                  <div className="topfold-subscribeLabel">WHO DO YOU PREFER TO BE CALLED?</div>

                  <input
                    ref={nameRef}
                    className="topfold-subscribeInput"
                    type="text"
                    value={name}
                    placeholder="your name"
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={(e) => {
                      if(e.key === "Enter"){
                        onNameSubmit();
                      }
                    }}
                    autoComplete="name"
                  />

                  <button
                    className="topfold-subscribeGo"
                    type="button"
                    onClick={onNameSubmit}
                    aria-label="Submit name"
                  >
                    →
                  </button>
                </div>
              )}
            </div>

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

            <button
  className="topfold-navItem"
  type="button"
  onClick={() => {
    const to = "n.lynnscott@gmail.com";
    const subject = encodeURIComponent("NIKI — Contact");
    const body = encodeURIComponent("Hi NIKI,\n\n");
    const href = `mailto:${to}?subject=${subject}&body=${body}`;

    window.open(href,"_blank","noopener,noreferrer");
  }}
>
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

      <ShopGallery />
    </>
  );
};

export default TopFold;
