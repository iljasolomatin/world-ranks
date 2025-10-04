import CountriesSearch from "@/components/CountriesSearch";
import HeroBanner from "@/components/HeroBanner";
import { ModeToggle } from "@/components/ModeToggle";

function page() {
  return (
    <div className="bg-background min-h-screen">
      {/* THEME SWITCHER */}
      <div className="absolute top-4 right-4 z-10">
        <ModeToggle />
      </div>

      <HeroBanner />

      {/* FLOATING CARD */}
      <div className="relative z-20 mx-auto -mt-28 max-w-7xl px-4">
        <div className="bg-muted flex flex-col rounded-lg border px-4 py-6 shadow-lg lg:flex-row">
          {/* SETTINGS PANEL */}
          <CountriesSearch />
        </div>
      </div>
    </div>
  );
}

export default page;
