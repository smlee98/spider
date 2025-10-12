import Catalog from "@/app/(app)/catalog";

export default function Home() {
  return (
    <div className="relative -mt-16 min-h-dvh overflow-hidden">
      <div className="absolute flex size-full items-center justify-center p-6">
        <Catalog />
      </div>
      <div className="absolute inset-0 -z-10 size-full min-w-full bg-black/70 select-none" />
      <video
        width="1920"
        height="960"
        className="absolute -z-20 mt-4 size-full min-w-full object-cover select-none"
        preload="auto"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="intro.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
