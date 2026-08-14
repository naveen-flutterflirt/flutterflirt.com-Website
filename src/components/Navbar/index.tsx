import Image from "next/image";
import Link from "next/link";

const navLinks = [
  { name: "Services", href: "/services" },
  { name: "Our Story", href: "/our-story" },
  { name: "Blog", href: "/blog" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-6 z-50">
      <nav
        className="
          mx-auto
          flex
          h-[52px]
          w-[92%]
          max-w-[1600px]
          items-center
          justify-between
          rounded-[18px]
          border
          border-white/60
          bg-white/60
          backdrop-blur-lg
          px-6
          shadow-[0_10px_35px_rgba(15,23,42,.05)]
          transition-all
          duration-300
        "
      >
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/logo-white.png"
            alt="Logo" width={250} height={170}
            className="h-auto w-[180px] brightness-0"
            priority
          />
        </Link>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="
                text-sm
                font-medium
                text-slate-700
                font-bold
                transition-colors
                duration-200
                hover:text-slate-950
                text-[#1eba5f]
                hover:text-black
              "
            >
              {link.name}
            </Link>
          ))}
        </div>

        {/* Help Button */}
        <Link
          href="#help"
          className="
            rounded-[8px]
            border
            border-blue-700
            bg-white-600/80
            text-center
            h-[28px]
            w-[64px]
            font-bold
            text-blue-700
            transition-all
            duration-200
            hover:bg-blue-700
            hover:text-white
          "
        >
          Help
        </Link>
      </nav>
    </header>
  );
}