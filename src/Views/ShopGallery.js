import React,{useMemo,useState} from "react";
import "./ShopGallery.css";

import travelPlannerImg from "../assets/images/nikiapp_shop_travelplanner_transparent.png";
import layoverImg from "../assets/images/nikiapp_shop_layoverlifesavers_transparent.png";
import holyGrailImg from "../assets/images/nikiapp_shop_holygrail_transparent.png";
import carryOnImg from "../assets/images/nikiapp_shop_carryon_transparent.png";
import galleryArch from "../assets/images/niki_fine_line_arch_transparent.png";
import secondaryLogo from "../assets/images/nikiapp_aesthetic.png";
import descArch from "../assets/images/nikiapp_shop_description_arch_1.png";

const ShopGallery = () => {
  const items = useMemo(() => ([
    {
      key:"carryOn",
      title:"Carry-On Essentials Planner",
      bodyNode:(
        <>
          As a Senior Strategist, I believe travel should be seamless, chic, and completely stress-free. Your upcoming itinerary is complex, which means packing must be highly organized.
        </>
      ),
      price:"$9.97",
      buttonLabel:"PAYPAL",
      buttonUrl:"https://www.paypal.com/"
    },
    {
      key:"travelPlanner",
      title:"The Ultimate Collaborative Travel Planner",
      bodyNode:(
        <>
          Stop planning in 10 different apps—collaborate, budget, and organize everything in one master robust, multi-tab Google Sheet (lodging, transport, shared expenses, etc.).
          <br /><br />
          This guide is for you if you are:
          <ul>
            <li>Detail-oriented and value advanced planning</li>
            <li>Appreciative of beautiful design and aesthetic strategies</li>
            <li>Wants an all-in-one document to collaborate on trip details</li>
          </ul>
        </>
      ),
      price:"$19.97",
      buttonLabel:"PAYPAL",
      buttonUrl:"https://www.paypal.com/"
    },
    {
      key:"layover",
      title:"Layover Lifesavers",
      bodyNode:(
        <>
          Shop my MUST HAVES for freshening up during long flights and layovers,.
          <br /><br />
          All under $55. Half under $10.
        </>
      ),
      price:"$55 or lower",
      buttonLabel:"AMAZON",
      buttonUrl:"https://www.amazon.com/hz/wishlist/ls/3G86YPQW84XXE?ref_=wl_share"
    },
    {
      key:"holyGrail",
      title:"Holy Grail of Lashes",
      bodyNode:(
        <>
          My go-to lash routine for travel weeks. Tap below to shop Lashify.
        </>
      ),
      price:"",
      buttonLabel:"LASHIFY",
      buttonUrl:"https://affiliatealliance.lashify.com/NIKIAESTHETIC"
    }
  ]),[]);

  const [activeKey,setActiveKey] = useState("carryOn");

  const activeItem = useMemo(() => {
    return items.find((i) => i.key === activeKey) || items[0];
  },[activeKey,items]);

  const openLink = (url) => {
    if(!url) return;
    window.open(url,"_blank","noopener,noreferrer");
  };

  return (
    <section className="shopGallery" id="shopGallery" aria-label="Shop gallery">
      <div className="shopGallery-inner">
        <div className="shopGallery-header">
          <div className="shopGallery-title">
            <span className="shopGallery-titleStrong">SHOP NIKI </span>
            <img className="shopGallery-titleLogo" src={secondaryLogo} alt="NIKI aesthetic" draggable={false} />
          </div>
        </div>

        <div className="shopGallery-grid">
          <div className="shopGallery-left" aria-label="Gallery">
            <img className="shopGallery-arc" src={galleryArch} alt="" draggable={false} aria-hidden="true" />

            <div className="shopGallery-cards">
              <button className="shopGallery-card" type="button" onClick={() => setActiveKey("carryOn")}>
                <img className="shopGallery-img" src={carryOnImg} alt="Carry-on Planner" draggable={false} />
              </button>

              <button className="shopGallery-card" type="button" onClick={() => setActiveKey("travelPlanner")}>
                <img className="shopGallery-img" src={travelPlannerImg} alt="Travel Planner" draggable={false} />
              </button>

              <button className="shopGallery-card" type="button" onClick={() => setActiveKey("layover")}>
                <img className="shopGallery-img" src={layoverImg} alt="Layover Lifesavers" draggable={false} />
              </button>

              <button className="shopGallery-card" type="button" onClick={() => setActiveKey("holyGrail")}>
                <img className="shopGallery-img" src={holyGrailImg} alt="Holy Grail of Lashes" draggable={false} />
              </button>
            </div>
          </div>

          <div className="shopGallery-right" aria-label="Right promo panel">
            <img className="shopGallery-descArch" src={descArch} alt="" draggable={false} aria-hidden="true" />

            <div className={`shopGallery-panel shopGallery-panel--${activeItem.key}`}>
              <div className="shopGallery-slot shopGallery-slotTitle">
                <div className="shopGallery-slotInner">
                  <div className="shopGallery-titleText">{activeItem.title}</div>
                </div>
              </div>

              <div className="shopGallery-slot shopGallery-slotBody">
                <div className="shopGallery-slotInner">
                  <div className="shopGallery-bodyText">{activeItem.bodyNode}</div>
                </div>
              </div>

              <div className="shopGallery-slot shopGallery-slotPrice">
                <div className="shopGallery-slotInner">
                  {!!activeItem.price && (
                    <div className="shopGallery-priceText">{activeItem.price}</div>
                  )}
                </div>
              </div>

              <div className="shopGallery-slot shopGallery-slotButton">
                <div className="shopGallery-slotInner">
                  <button
                    className="shopGallery-panelBtn"
                    type="button"
                    onClick={() => openLink(activeItem.buttonUrl)}
                  >
                    {activeItem.buttonLabel}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopGallery;
