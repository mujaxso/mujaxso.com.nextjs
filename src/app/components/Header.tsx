import Link from "next/link";
import Image from "next/image";
import ModeToggle from "./ModeToggle";

export default function Header() {
  return (
    <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent flex items-center">
          <Image src="/your-image.jpg" alt="Mujahid Siyam" width={32} height={32} className="rounded-full mr-2" />
          Mujahid Siyam
        </h1>
        <nav className="flex items-center gap-4">
          <ModeToggle />
          <ul className="flex gap-6">
            <li>
              <Link href="/projects" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Projects
              </Link>
            </li>
            <li>
              <Link href="#about" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                About
              </Link>
            </li>
            <li>
              <Link href="#contact" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Contact
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
