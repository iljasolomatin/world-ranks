import Link from "next/link";

function Footer() {
  return (
    <div className="mt-14 mb-14 flex justify-center">
      <p className="text-muted-foreground">
        <Link
          href="https://www.iljasolomatin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-foreground underline"
        >
          Ilja Solomatin
        </Link>{" "}
        &copy; 2025
      </p>
    </div>
  );
}

export default Footer;
