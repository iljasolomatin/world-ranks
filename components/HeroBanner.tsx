import Image from "next/image";
import heroImage from "@/public/hero-image.jpg";
import logo from "@/public/logo.svg";

function HeroBanner() {
  return (
    <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden bg-black">
      <Image
        src={heroImage}
        fill
        quality={75}
        placeholder="blur"
        className="mt-14 object-cover object-center"
        alt="Aerial view of Earth at night"
      />

      {/* LOGO */}
      <div className="absolute top-16 z-10 flex gap-1.5 text-2xl font-bold text-[#d2d5da] md:text-3xl">
        <Image
          src={logo}
          width={24}
          height={24}
          alt="Logo"
          className="inline-block"
        />
        World <span className="text-primary">Ranks</span>
      </div>
    </div>
  );
}

export default HeroBanner;
