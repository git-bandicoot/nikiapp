import React,{useEffect,useRef,useState} from "react";
import "./Shop.css";

const Shop = ({socialRef,navRef}) => {
  const [rect,setRect] = useState({left:0,width:0});
  const [isEditing,setIsEditing] = useState(false);
  const [email,setEmail] = useState("");
  const [blinkOn,setBlinkOn] = useState(true);
  const [status,setStatus] = useState("");
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const storageKey = "niki_subscribed_emails_v1";

  const computeRect = () => {
    const socialEl = socialRef?.current;
    const navEl = navRef?.current;

    if(!socialEl || !navEl){
      const socialBox = socialEl.getBoundingClientRect();
      return;
    }

    const socialBox = socialEl.getBoundingClientRect();
const navBox = navEl.getBoundingClientRect();
const loginEl = navEl.querySelector(".topfold-navItem");
const loginBox = loginEl ? loginEl.getBoundingClientRect() : null;

const pad = 18;
const left = Math.round(socialBox.right + pad);
const rightTarget = loginBox ? loginBox.right : navBox.left;
const right = Math.round(rightTarget + pad);

const width = Math.max(0,right - left);
setRect({left,width});

  };

  useEffect(() => {
    computeRect();
    window.addEventListener("resize",computeRect);
    return () => window.removeEventListener("resize",computeRect);
  },[]);

  useEffect(() => {
    if(!isEditing){
      return;
    }
    const id = setInterval(() => setBlinkOn((v) => !v),500);
    return () => clearInterval(id);
  },[isEditing]);

  useEffect(() => {
    const onDocMouseDown = (e) => {
      if(!wrapRef.current){
        return;
      }
      if(!wrapRef.current.contains(e.target)){
        setIsEditing(false);
        setEmail("");
        setStatus("");
      }
    };

    document.addEventListener("mousedown",onDocMouseDown);
    return () => document.removeEventListener("mousedown",onDocMouseDown);
  },[]);

  useEffect(() => {
    if(isEditing && inputRef.current){
      inputRef.current.focus();
    }
  },[isEditing]);

  const openEdit = () => {
    setIsEditing(true);
    setStatus("");
  };

  const saveEmail = () => {
    const trimmed = email.trim().toLowerCase();
    if(!trimmed){
      setStatus("Enter an email");
      return;
    }

    try{
      const raw = localStorage.getItem(storageKey);
      const parsed = raw ? JSON.parse(raw) : [];
      const list = Array.isArray(parsed) ? parsed : [];

      if(list.includes(trimmed)){
        setStatus("Already on the list");
        return;
      }

      const next = [...list,trimmed];
      localStorage.setItem(storageKey,JSON.stringify(next));
      setStatus("Added");
    }catch(_e){
      setStatus("Could not save");
    }
  };

  const onKeyDown = (e) => {
    if(e.key === "Enter"){
      e.preventDefault();
      saveEmail();
      return;
    }

    if(e.key === "Escape"){
      e.preventDefault();
      setIsEditing(false);
      setEmail("");
      setStatus("");
      return;
    }
  };

  if(rect.width <= 0){
    return null;
  }

  return (
    <div className="shopTopBarBanner" ref={wrapRef} style={{left:`${rect.left}px`,width:`${rect.width}px`}}>
      <div className="shopTopBarInner" onClick={openEdit} role="button" tabIndex={0}>
        <span className="shopTopBarLabel">
  LIVE THE AESTHETIC:

</span>

{!isEditing ? (
  <span className="shopTopBarPlaceholder">example@youremail.com</span>
) : (
  <span className="shopTopBarInputRow">
    <input
      ref={inputRef}
      className="shopTopBarInput"
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      onKeyDown={onKeyDown}
      autoComplete="email"
      spellCheck={false}
    />
    {status && <span className="shopTopBarStatus">{status}</span>}
  </span>
)}

      </div>
    </div>
  );
};

export default Shop;
