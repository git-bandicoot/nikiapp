(() => {
    const clockEl = document.getElementById("clock");
    const clockText = document.getElementById("clockText");

    if (!clockEl) return;

    // Sprite mapping: background positions for each character.
    // These are STARTING DEFAULTS. If a digit looks off, tweak x/y for that digit.
    // Units are in px on the sprite image AFTER background-size scaling.
    const SPRITE = {
        "0": { x: 0, y: 0 },
        "1": { x: -100, y: -120 },
        "2": { x: -200, y: -120 },
        "3": { x: -100, y: -360 },
        "4": { x: -300, y: -120 },
        "5": { x: 0, y: -240 },
        "6": { x: -200, y: -240 },
        "7": { x: -200, y: -360 },
        "8": { x: -300, y: -240 },
        "9": { x: -300, y: -360 },
        ":": { x: -200, y: 0 }
    };

    const setSlot = (slot, ch) => {
        const el = clockEl.querySelector(`[data-slot="${slot}"]`);
        if (!el) return;

        const pos = SPRITE[ch] || SPRITE["0"];
        el.style.backgroundPosition = `${pos.x}px ${pos.y}px`;
    };

    const pad2 = (n) => String(n).padStart(2, "0");

    const tick = () => {
        const now = new Date();
        const hh = pad2(now.getHours());
        const mm = pad2(now.getMinutes());
        const text = `${hh}:${mm}`;

        // Update accessible text
        if (clockText) clockText.textContent = text;
        clockEl.setAttribute("data-time", text);

        setSlot("h1", hh[0]);
        setSlot("h2", hh[1]);
        setSlot("c1", ":");
        setSlot("m1", mm[0]);
        setSlot("m2", mm[1]);
    };

    tick();
    setInterval(tick, 1000);
})();
