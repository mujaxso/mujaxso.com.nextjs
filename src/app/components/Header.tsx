import Link from "next/link";

export default function Header() {
  return (
    <header className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          John Doe
        </h1>
        <nav>
          <ul className="flex gap-6">
            <li>
              <Link href="#work" className="text-zinc-900 dark:text-zinc-100 hover:text-blue-500 dark:hover:text-blue-400 transition-colors">
                Work
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
