// src/lib/scroll.ts
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import LocomotiveScroll from 'locomotive-scroll';


gsap.registerPlugin(ScrollTrigger);


export function initSmoothScroll(container: HTMLElement) {
const loco = new LocomotiveScroll({
el: container,
smooth: true,
lerp: 0.08,
multiplier: 1,
tablet: { smooth: true },
smartphone: { smooth: true }
});


ScrollTrigger.scrollerProxy(container, {
scrollTop(value) { return arguments.length ? loco.scrollTo(value, 0, 0) : loco.scroll.instance.scroll.y; },
getBoundingClientRect() { return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight }; },
pinType: container.style.transform ? 'transform' : 'fixed'
});


loco.on('scroll', ScrollTrigger.update);
ScrollTrigger.addEventListener('refresh', () => loco.update());
ScrollTrigger.refresh();


return loco;
}