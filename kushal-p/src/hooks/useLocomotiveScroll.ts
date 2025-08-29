import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export const useLocomotiveScroll = () => {
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    let locomotiveScroll: any;

    const initScroll = async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;

      locomotiveScroll = new LocomotiveScroll({
        el: document.querySelector('[data-scroll-container]') as HTMLElement,
        smooth: true,
        multiplier: 1,
        class: 'is-reveal'
      });

      // Update ScrollTrigger when locomotive scroll updates
      locomotiveScroll.on('scroll', ScrollTrigger.update);

      // Configure ScrollTrigger to use locomotive scroll
      ScrollTrigger.scrollerProxy('[data-scroll-container]', {
        scrollTop(value) {
          return arguments.length ? locomotiveScroll.scrollTo(value, 0, 0) : locomotiveScroll.scroll.instance.scroll.y;
        },
        getBoundingClientRect() {
          return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        pinType: (document.querySelector('[data-scroll-container]') as HTMLElement)?.style.transform ? 'transform' : 'fixed'
      });

      ScrollTrigger.addEventListener('refresh', () => locomotiveScroll.update());
      ScrollTrigger.refresh();
    };

    initScroll();

    return () => {
      if (locomotiveScroll) {
        ScrollTrigger.removeEventListener('refresh', () => locomotiveScroll.update());
        locomotiveScroll.destroy();
      }
    };
  }, []);

  return scrollRef;
};