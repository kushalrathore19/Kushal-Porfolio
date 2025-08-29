// src/components/Hero.tsx
import { useEffect, useRef } from "react";
import gsap from "gsap";
import Spline from "@splinetool/react-spline";

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.5, ease: "power4.out" }
      );
    }
  }, []);

  return (
    <section
      className="h-screen w-full flex flex-col items-center justify-center bg-black text-white relative"
      data-scroll-section
    >
      {/* 3D Spline integration */}
      <div className="absolute inset-0 -z-10">
        <Spline scene="https://prod.spline.design/https://app.spline.design/https://app.spline.design/community/file/a38eafa0-2fa5-4630-983f-6940475adf5e/scene.splinecode" />
      </div>

      {/* Text content */}
      <h1
        ref={titleRef}
        className="text-6xl font-bold text-center tracking-tight"
      >
        Hi, I’m <span className="text-indigo-400">Kushal Rathore</span>
      </h1>
      <p className="text-lg mt-4 opacity-80 text-center">
        AI/ML Engineer | Backend & Frontend Developer | Public Speaker
      </p>
    </section>
  );
}