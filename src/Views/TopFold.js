import React,{useMemo,useRef,useState,useEffect} from "react";
import "./TopFold.css";

import nikiAiLogo from "../assets/images/nikiapp_ailogo_v4_2.gif";
import nikiLandingArc from "../assets/images/nikiapp_landingpage_arc_v1_5.jpg";
import candleFlame from "../assets/images/flame-flicker.gif";
import googleIcon from "../assets/images/google.png";
import redditIcon from "../assets/images/reddit.png";
import xIcon from "../assets/images/x.png";
import metaIcon from "../assets/images/meta.png";
import nikiIcon from "../assets/images/top_logo.png";


const TopFold = () => {
  const [targetLang,setTargetLang] = useState("fr"); // "en","es","fr","it","de","ja"

  const [isContactHover,setIsContactHover] = useState(false);
  const [isBlueLocked,setIsBlueLocked] = useState(false);

  const [isWelcomeHover,setIsWelcomeHover] = useState(false);
  const [isFlameLocked,setIsFlameLocked] = useState(false);

  const [isTickerHover,setIsTickerHover] = useState(false);
  const [tickIndex,setTickIndex] = useState(0);

  const [isHold,setIsHold] = useState(false);
  const [holdDots,setHoldDots] = useState(0);

  const [rotation,setRotation] = useState([]);

  /* NEW: WELCOME moves text up once */
  const [isWelcomeExpanded,setIsWelcomeExpanded] = useState("");

  /* FIX: define welcomeSource + setter (removes eslint no-undef) */
  const [welcomeSource,setWelcomeSource] = useState("");

  const hoverDelayRef = useRef(null);
  const tickerTimeoutRef = useRef(null);
  const holdIntervalRef = useRef(null);
  const holdTimeoutRef = useRef(null);

  const showFlame = isFlameLocked || isWelcomeHover;

  const baseWelcomeLabel = useMemo(() => {
    const map = {
      en:"WELCOME",
      es:"BIENVENIDO",
      fr:"BIENVENUE",
      it:"BENVENUTO",
      de:"WILLKOMMEN",
      ja:"ようこそ"
    };
    return map[targetLang] || "WELCOME";
  },[targetLang]);

  const welcomeLabel = useMemo(() => {
  if(!welcomeSource){
    return baseWelcomeLabel;
  }
  return `${baseWelcomeLabel}, ${welcomeSource} USER`;
},[baseWelcomeLabel,welcomeSource]);

  // WELCOME scroll-on-language-switch (700ms)
  const [welcomePrev,setWelcomePrev] = useState(null);
  const [welcomeShift,setWelcomeShift] = useState(false);
  const welcomeShiftRef = useRef(null);

  useEffect(() => {
    if(welcomePrev === null){
      setWelcomePrev(welcomeLabel);
      return;
    }

    if(welcomeLabel === welcomePrev){
      return;
    }

    setWelcomeShift(true);

    if(welcomeShiftRef.current){
      clearTimeout(welcomeShiftRef.current);
      welcomeShiftRef.current = null;
    }

    welcomeShiftRef.current = setTimeout(() => {
      setWelcomePrev(welcomeLabel);
      setWelcomeShift(false);
      welcomeShiftRef.current = null;
    },700);
  },[welcomeLabel,welcomePrev]);

  const shuffle = (arr) => {
    const a = [...arr];
    for(let i = a.length - 1;i > 0;i--){
      const j = Math.floor(Math.random() * (i + 1));
      [a[i],a[j]] = [a[j],a[i]];
    }
    return a;
  };

  const countWords = (s) => {
    const cleaned = String(s).trim();
    if(!cleaned){
      return 0;
    }
    return cleaned.split(/\s+/).length;
  };

  const msForLine = (line) => {
    const words = countWords(line);
    const chunks = Math.max(1,Math.ceil(words / 4));
    return chunks * 1000;
  };

  const stopTicker = () => {
    if(tickerTimeoutRef.current){
      clearTimeout(tickerTimeoutRef.current);
      tickerTimeoutRef.current = null;
    }
  };

  const clearHoverDelay = () => {
    if(hoverDelayRef.current){
      clearTimeout(hoverDelayRef.current);
      hoverDelayRef.current = null;
    }
  };

  const languageItems = useMemo(() => {
    const t = ({
      en:{
        howAreYou:"How are you?",
        goodDay:"Have a good day!",
        howDoYouSay:"How do you say…?",
        speakLittle:"I speak a little English.",
        speakGood:"I speak English well.",
        speakBroken:"My English is broken."
      },
      es:{
        howAreYou:"¿Cómo estás?",
        goodDay:"¡Que tengas un buen día!",
        howDoYouSay:"¿Cómo se dice…?",
        speakLittle:"Hablo un poco de español.",
        speakGood:"Hablo bien español.",
        speakBroken:"Hablo español mal."
      },
      fr:{
        howAreYou:"Comment ça va ?",
        goodDay:"Bonne journée !",
        howDoYouSay:"Comment dit-on… ?",
        speakLittle:"Je parle un peu français.",
        speakGood:"Je parle bien français.",
        speakBroken:"Je parle français mal."
      },
      it:{
        howAreYou:"Come stai?",
        goodDay:"Buona giornata!",
        howDoYouSay:"Come si dice…?",
        speakLittle:"Parlo un po’ italiano.",
        speakGood:"Parlo bene italiano.",
        speakBroken:"Parlo italiano male."
      },
      de:{
        howAreYou:"Wie geht es dir?",
        goodDay:"Einen schönen Tag noch!",
        howDoYouSay:"Wie sagt man…?",
        speakLittle:"Ich spreche ein wenig Deutsch.",
        speakGood:"Ich spreche gut Deutsch.",
        speakBroken:"Ich spreche schlecht Deutsch."
      },
      ja:{
        howAreYou:"お元気ですか？",
        goodDay:"良い一日を！",
        howDoYouSay:"どう言いますか…？",
        speakLittle:"日本語を少し話します。",
        speakGood:"日本語を上手に話します。",
        speakBroken:"日本語があまり話せません。"
      }
    })[targetLang] || ({
      howAreYou:"How are you?",
      goodDay:"Have a good day!",
      howDoYouSay:"How do you say…?",
      speakLittle:"I speak a little English.",
      speakGood:"I speak English well.",
      speakBroken:"My English is broken."
    });

    return [
      t.howAreYou,
      t.goodDay,
      t.howDoYouSay,
      t.speakLittle,
      t.speakGood,
      t.speakBroken
    ];
  },[targetLang]);

  const promptItems = useMemo(() => ([
    "NIKI, am I where I'm supposed to be?",
    "THESE EARRINGS MATCH MY TRAVEL CLOSET?",
    "BUDGET FOR DAILY DRINKS AND GELATO.",
    "BOOK A TEN DAY FRENCH BEACH VACATION, STARTING JUNE 18TH.",
    "WHAT IS A REALISTIC VACATION I CAN BOOK BASED ON BANK HISTORY?",
    "I THINK I'M IN DANGER."
  ]),[]);

  const buildRandomRotation = () => {
    const pool = [
      ...promptItems,
      ...languageItems
    ];

    const next = shuffle(pool);
    setRotation(next);
    setTickIndex(0);
    return next;
  };

  const scheduleNextTick = (idx,rot) => {
    stopTicker();

    const list = rot && rot.length ? rot : rotation;
    if(!list || !list.length){
      return;
    }

    const safeIdx = ((idx % list.length) + list.length) % list.length;
    const line = list[safeIdx] || "";
    const delayMs = msForLine(line);

    tickerTimeoutRef.current = setTimeout(() => {
      setTickIndex((i) => {
        const ni = (i + 1) % list.length;
        scheduleNextTick(ni,list);
        return ni;
      });
    },delayMs);
  };

  const startTicker = (rot) => {
    stopTicker();
    scheduleNextTick(0,rot);
  };

  const stopHold = () => {
    if(holdIntervalRef.current){
      clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
    if(holdTimeoutRef.current){
      clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    setIsHold(false);
    setHoldDots(0);
  };

  const startHold = () => {
    stopHold();
    setIsHold(true);
    setHoldDots(0);

    holdIntervalRef.current = setInterval(() => {
      setHoldDots((d) => (d + 1) % 4);
    },250);

    holdTimeoutRef.current = setTimeout(() => {
      stopHold();
      setIsBlueLocked(false);

      if(isContactHover){
        clearHoverDelay();
        hoverDelayRef.current = setTimeout(() => {
          setIsTickerHover(true);
          const rot = buildRandomRotation();
          startTicker(rot);
          hoverDelayRef.current = null;
        },1000);
      }
    },3000);
  };

  const handleContactClick = () => {
    clearHoverDelay();
    stopTicker();
    setIsTickerHover(false);

    setIsBlueLocked(true);
    startHold();
  };

  const handleContactEnter = () => {
    setIsContactHover(true);

    if(isHold || isBlueLocked){
      return;
    }

    clearHoverDelay();
    hoverDelayRef.current = setTimeout(() => {
      setIsTickerHover(true);
      const rot = buildRandomRotation();
      startTicker(rot);
      hoverDelayRef.current = null;
    },1000);
  };

  const handleContactLeave = () => {
    setIsContactHover(false);

    clearHoverDelay();
    stopTicker();
    setIsTickerHover(false);
    setTickIndex(0);
  };

  const handleIconClick = () => {
  setIsWelcomeExpanded(false);
};

  useEffect(() => {
    return () => {
      clearHoverDelay();
      stopTicker();
      stopHold();

      if(welcomeShiftRef.current){
        clearTimeout(welcomeShiftRef.current);
        welcomeShiftRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  },[]);

  const isTickerActive = isTickerHover && !isBlueLocked && !isHold;
  const holdText = `PLEASE HOLD${".".repeat(holdDots)}`;

  const langOptions = [
    {id:"en",label:"EN"},
    {id:"es",label:"ES"},
    {id:"fr",label:"FR"},
    {id:"it",label:"IT"},
    {id:"de",label:"DE"},
    {id:"ja",label:"JP"}
  ];

  return (
    <section className="topfold-niki" aria-label="Top fold">
      <div className="topfold-shell">
        <div className="topfold-left" aria-hidden="true">
          <div className="topfold-archFrame">
            <img className="topfold-archImg" src={nikiLandingArc} alt="" />
            {showFlame ? <img className="topfold-flame" src={candleFlame} alt="" /> : null}
          </div>
        </div>

        <div className="topfold-right">
          <div className={`topfold-copy${isContactHover ? " isContactHover" : ""}${isWelcomeExpanded ? " isWelcomeExpanded" : ""}`}>
            <div className="topfold-textStack">
              <div className="topfold-textGroup">
                <h1 className="topfold-wordmark">NIKI</h1>
                <p className="topfold-tag">TRAVEL AESTHETIC SPECIALIST</p>
              </div>

              <div className={`topfold-revealRow${isWelcomeExpanded ? " isOn" : ""}`}>
  <button
    className="iconBtn"
    type="button"
    onClick={() => {
    setWelcomeSource("GOOGLE");
    setIsWelcomeExpanded(false);
  }}>
    <img src={googleIcon} alt="Google" />
  </button>

  <button
    className="iconBtn"
    type="button"
    onClick={() => {
    setWelcomeSource("REDDIT");
    setIsWelcomeExpanded(false);
  }}>
    <img src={redditIcon} alt="Reddit" />
  </button>

  <button
    className="iconBtn"
    type="button"
    onClick={() => {
    setWelcomeSource("NIKI");
    setIsWelcomeExpanded(false);
  }}>
    <img className="isNikiIcon" src={nikiIcon} alt="Niki" />
  </button>

  <button
    className="iconBtn"
    type="button"
    onClick={() => {
    setWelcomeSource("X");
    setIsWelcomeExpanded(false);
  }}>
    <img src={xIcon} alt="X" />
  </button>

  <button
    className="iconBtn"
    type="button"
    onClick={() => {
    setWelcomeSource("META");
    setIsWelcomeExpanded(false);
  }}>
    <img src={metaIcon} alt="Meta" />
  </button>
</div>
              </div>


            <div className="topfold-cta">
              <div className="topfold-langPick" aria-label="Language">
                {langOptions.map((o) => (
                  <label className="langOpt" key={o.id}>
                    <input
                      type="radio"
                      name="lang"
                      value={o.id}
                      checked={targetLang === o.id}
                      onChange={(e) => setTargetLang(e.target.value)}
                    />
                    <span className="langDot" aria-hidden="true" />
                    <span className="langLbl">{o.label}</span>
                  </label>
                ))}
              </div>

              <button
                className="topfold-btn topfold-btnLong"
                type="button"
                onMouseEnter={() => setIsWelcomeHover(true)}
                onMouseLeave={() => setIsWelcomeHover(false)}
                onClick={() => setIsWelcomeExpanded(true)}
              >
                <span className={`welcomeFace${welcomeShift ? " isShift" : ""}`}>
                  <span className="welcomeLayer welcomeLayerPrev">
                    {welcomePrev ?? welcomeLabel}
                  </span>
                  <span className="welcomeLayer welcomeLayerNext">
                    {welcomeLabel}
                  </span>
                </span>
              </button>

              <button
                className={`topfold-btn topfold-btnDouble${isBlueLocked ? " isBlueLocked" : ""}${isTickerActive ? " isTicker" : ""}${isHold ? " isHold" : ""}`}
                type="button"
                onMouseEnter={handleContactEnter}
                onMouseLeave={handleContactLeave}
                onClick={handleContactClick}
                style={{"--tickIndex":tickIndex}}
                disabled={isHold}
              >
                <span className="btnFace">
                  <span className="btnLayer btnLayerLabel">
                    {isHold ? holdText : "Contact NIKI"}
                  </span>

                  <span className="btnLayer btnLayerTicker" aria-hidden="true">
                    <span className="btnTickerViewport">
                      <span className="btnTickerTrack">
                        {rotation.length ? rotation.map((t,i) => (
                          <span className="btnTickerItem" key={`${i}-${t}`}>{t}</span>
                        )) : null}
                      </span>
                    </span>
                  </span>
                </span>
              </button>
            </div>

            <div className="topfold-goldWrap" aria-hidden="true">
              <img className="topfold-goldLogo" src={nikiAiLogo} alt="" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopFold;
