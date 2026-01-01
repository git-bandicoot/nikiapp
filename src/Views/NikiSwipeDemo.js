import React from "react";
import "./NikiSwipeDemo.css";

const NikiSwipeDemo = () => {
    return (
        <main className="nikiSwipe" aria-label="Niki vertical swipe demo">
            <section className="nikiSwipe__panel" aria-label="Page 1">
                <img className="nikiSwipe__img" src="/assets/page1.png" alt="Niki page 1" />
            </section>

            <section className="nikiSwipe__panel" aria-label="Page 2">
                <img className="nikiSwipe__img" src="/assets/page2.png" alt="Niki page 2" />
            </section>

            <section className="nikiSwipe__panel" aria-label="Page 3">
                <img className="nikiSwipe__img" src="/assets/page3.png" alt="Niki page 3" />
            </section>
        </main>
    );
};

export default NikiSwipeDemo;
