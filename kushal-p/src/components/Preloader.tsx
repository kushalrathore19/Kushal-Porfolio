import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';


type Props = { onComplete?: () => void };
export default function Preloader({ onComplete }: Props) {
const [progress, setProgress] = useState(0);
const barRef = useRef<HTMLDivElement>(null);
const txtRef = useRef<HTMLDivElement>(null);
const wrapRef = useRef<HTMLDivElement>(null);


useEffect(() => {
const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
const total = 100;
let current = 0;
const id = setInterval(() => {
current = Math.min(current + Math.random() * 7 + 1, total);
setProgress(Math.floor(current));
gsap.to(barRef.current, { width: `${current}%`, duration: 0.2 });
if (current >= total) {
clearInterval(id);
tl.to(txtRef.current, { y: -10, autoAlpha: 0, duration: 0.3 })
.to(barRef.current, { width: '100%', duration: 0.3 }, '<')
.to(wrapRef.current, { yPercent: -100, duration: 0.8 })
.set(wrapRef.current, { display: 'none' })
.add(() => onComplete && onComplete());
}
}, 80);
return () => clearInterval(id);
}, [onComplete]);


return (
<div ref={wrapRef} className="fixed inset-0 z-[9999] bg-[#0B0F19] text-white flex items-center justify-center">
<div className="w-[min(80vw,560px)] text-center">
<div className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Kushal</div>
<div className="h-1 w-full bg-white/10 rounded">
<div ref={barRef} className="h-1 bg-white rounded" style={{ width: '0%' }} />
</div>
<div ref={txtRef} className="mt-3 text-xs uppercase tracking-widest opacity-80">{progress}%</div>
</div>
</div>
);
}