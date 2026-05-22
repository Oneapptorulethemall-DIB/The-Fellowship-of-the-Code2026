(function () {
    "use strict";

    const viewport = document.getElementById("map-viewport");
    const stage = document.getElementById("map-stage");
    const routeLabel = document.getElementById("map-route-lable");
    const routeButtons = document.querySelectorAll(".route-btn[data-route]");
    const mapImages = document.querySelectorAll(".map-image[data-route]");
    const controlButtons = document.querySelectorAll(".map-control-btn[data-action]");

    if (!viewport || !stage || routeButtons.length === 0 || mapImages.length === 0) {
        console.warn("Map viewer: missing viewport, stage, buttons, or images.");
        return;
    }

    const ROUTE_LABELS = {
        caradhras: "Pass of Caradhras",
        moria: "Mines of Moria",
        rohan: "Gate of Rohan",
        south: "The way to the far south",
    };

    const ROUTE_DEFAULT_VIEW = {
        caradhras: { scale: 1.2, x: 0, y: 0 },
        moria: { scale: 1.2, x: 0, y: 0 },
        rohan: { scale: 1.2, x: 0, y: 0 },
        south: { scale: 1.2, x: 0, y: 0 },
    };

    const MIN_SCALE = 0.05;
    const MAX_SCALE = 4;
    const ZOOM_STEP = 1.15;

    let activeRoute = null;
    let scale = 1;
    let translateX = 0;
    let translateY = 0;

    const savedViews = {};

    let isDragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragOriginX = 0;
    let dragOriginY = 0;

    let activePointerId = null;

    let pinchStartDistance = 0;
    let pinchStartScale = 1;

    function clampScale(value) {
        return Math.min(MAX_SCALE, Math.max(MIN_SCALE, value));
    }

    function applyTransform() {
        stage.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    function getActiveImage() {
        return document.querySelector(".map-image.is-active[data-route]");
    }

    function saveCurrentView() {
        if (!activeRoute) return;
        savedViews[activeRoute] = { scale, x: translateX, y: translateY };
    }

    function loadViewForRoute(routeId) {
        if (savedViews[routeId]) {
            scale = savedViews[routeId].scale;
            translateX = savedViews[routeId].x;
            translateY = savedViews[routeId].y;
        } else if (ROUTE_DEFAULT_VIEW[routeId]) {
            scale = ROUTE_DEFAULT_VIEW[routeId].scale;
            translateX = ROUTE_DEFAULT_VIEW[routeId].x;
            translateY = ROUTE_DEFAULT_VIEW[routeId].y;
        } else {
            scale = 1;
            translateX = 0;
            translateY = 0;
        }
        applyTransform();
    }

    function fitImageToViewport() {
        const img = getActiveImage();
        if (!img || !img.naturalWidth) return;

        const vw = viewport.clientWidth;
        const vh = viewport.clientHeight;
        const fitScale = Math.min(vw / img.naturalWidth, vh / img.naturalHeight) * 0.95;

        scale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, fitScale));
        translateX = (vw - img.naturalWidth * scale) / 2;
        translateY = (vh - img.naturalHeight * scale) / 2;
        applyTransform();
    }

    function setActiveRoute(routeId) {
        if (!ROUTE_LABELS[routeId]) return;

        saveCurrentView();

        activeRoute = routeId;

        routeButtons.forEach((btn) => {
            const selected = btn.dataset.route === routeId;
            btn.classList.toggle("is-active", selected);
            btn.setAttribute("aria-pressed", selected ? "true" : "false");
        });

        mapImages.forEach((img) => {
            const selected = img.dataset.route === routeId;
            img.classList.toggle("is-active", selected);
            if (selected) {
                img.removeAttribute("hidden");
            } else {
                img.setAttribute("hidden", "");
            }
        });

        if (routeLabel) {
            routeLabel.textContent = ROUTE_LABELS[routeId];
        }

        const activeImg = getActiveImage();
        if (activeImg && activeImg.complete && activeImg.naturalWidth) {
            if (savedViews[routeId]) {
                loadViewForRoute(routeId);
            } else {
                fitImageToViewport();
            }
        } else if (activeImg) {
            activeImg.addEventListener("load", onActiveImageLoad, { once: true });
        }
    }

    function onActiveImageLoad() {
        if (!savedViews[activeRoute]) {
            fitImageToViewport();
        } else {
            loadViewForRoute(activeRoute);
        }
    }

    function zoomAt(viewportX, viewportY, newScale) {
        const rect = viewport.getBoundingClientRect();
        const x = viewportX - rect.left;
        const y = viewportY - rect.top;

        newScale = clampScale(newScale);
        const ratio = newScale / scale;

        translateX = x - ratio * (x - translateX);
        translateY = y - ratio * (y - translateY);
        scale = newScale;
        applyTransform();
    }

    function zoomIn() {
        const rect = viewport.getBoundingClientRect();
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, scale * ZOOM_STEP);
    }

    function zoomOut() {
        const rect = viewport.getBoundingClientRect();
        zoomAt(rect.left + rect.width / 2, rect.top + rect.height / 2, scale / ZOOM_STEP);
    }

    function resetView() {
        delete savedViews[activeRoute];
        fitImageToViewport();
        if (activeRoute) {
            savedViews[activeRoute] = { scale, x: translateX, y: translateY };
        }
    }

    routeButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            setActiveRoute(btn.dataset.route);
        });
    });

    controlButtons.forEach((btn) => {
        btn.addEventListener("click", () => {
            const action = btn.dataset.action;
            if (action === "zoom-in") zoomIn();
            else if (action === "zoom-out") zoomOut();
            else if (action === "reset") resetView();
        });
    });

    viewport.addEventListener(
        "wheel",
        (e) => {
            e.preventDefault();
            const factor = e.deltaY < 0 ? ZOOM_STEP : 1 / ZOOM_STEP;
            zoomAt(e.clientX, e.clientY, scale * factor);
        },
        { passive: false }
    );

    viewport.addEventListener("pointerdown", (e) => {
        if (e.button !== 0 && e.pointerType === "mouse") return;

        isDragging = true;
        activePointerId = e.pointerId;
        dragStartX = e.clientX;
        dragStartY = e.clientY;
        dragOriginX = translateX;
        dragOriginY = translateY;
        viewport.setPointerCapture(e.pointerId);
        viewport.classList.add("is-dragging");
    });

    viewport.addEventListener("pointermove", (e) => {
        if (!isDragging || e.pointerId !== activePointerId) return;

        translateX = dragOriginX + (e.clientX - dragStartX);
        translateY = dragOriginY + (e.clientY - dragStartY);
        applyTransform();
    });

    function endDrag(e) {
        if (e.pointerId !== activePointerId) return;
        isDragging = false;
        activePointerId = null;
        viewport.classList.remove("is-dragging");
        if (activeRoute) {
            savedViews[activeRoute] = { scale, x: translateX, y: translateY };
        }
    }

    viewport.addEventListener("pointerup", endDrag);
    viewport.addEventListener("pointercancel", endDrag);

    viewport.addEventListener(
        "touchstart",
        (e) => {
            if (e.touches.length === 2) {
                pinchStartDistance = getTouchDistance(e.touches);
                pinchStartScale = scale;
            }
        },
        { passive: true }
    );

    viewport.addEventListener(
        "touchmove",
        (e) => {
            if (e.touches.length !== 2) return;
            e.preventDefault();

            const dist = getTouchDistance(e.touches);
            const center = getTouchCenter(e.touches);
            const newScale = clampScale(pinchStartScale * (dist / pinchStartDistance));

            zoomAt(center.clientX, center.clientY, newScale);
        },
        { passive: false }
    );

    function getTouchDistance(touches) {
        const dx = touches[0].clientX - touches[1].clientX;
        const dy = touches[0].clientY - touches[1].clientY;
        return Math.hypot(dx, dy);
    }

    function getTouchCenter(touches) {
        const x = (touches[0].clientX + touches[1].clientX) / 2;
        const y = (touches[0].clientY + touches[1].clientY) / 2;
        return { clientX: x, clientY: y };
    }

    mapImages.forEach((img) => {
        img.addEventListener("error", () => {
            console.error("Map image failed to load:", img.src);
        });
    });

    function startMap() {
        const initial =
            document.querySelector(".route-btn.is-active[data-route]")?.dataset.route ||
            routeButtons[0].dataset.route;
        setActiveRoute(initial);
    }

    if (document.readyState === "complete") {
        startMap();
    } else {
        window.addEventListener("load", startMap);
    }
})();
