import Image from "next/image";
import heroImage from "@/public/hero-image.jpg";
import logo from "@/public/logo.svg";

import { ModeToggle } from "@/components/ModeToggle";

function page() {
  return (
    <div className="bg-background min-h-screen">
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>

      <div className="relative flex h-[300px] w-full items-center justify-center overflow-hidden bg-black">
        <Image
          src={heroImage}
          fill
          quality={80}
          placeholder="blur"
          className="mt-28 object-cover object-center"
          alt="Aerial view of Earth at night"
        />

        <p className="text-foreground z-10 flex gap-1.5 text-2xl font-bold md:text-3xl">
          <Image
            src={logo}
            width={24}
            height={24}
            alt="Logo"
            className="inline-block"
          />
          World <span className="text-primary">Ranks</span>
        </p>
      </div>
    </div>
  );
}

export default page;
