import Link from "next/link";
import { signOut } from "next-auth/client";
import { FiBell, FiLogOut } from "react-icons/fi";

export function Header({ title, backable = false }) {
  return (
    <header className="bg-white w-full p-4 shadow-lg">
      <section className="flex justify-between items-center">
        <h1 className="text-xl font-bold">{title}</h1>
        <nav className="flex gap-4">
          <Link href="/notifications">
            <a className="text-blue-700">
              <FiBell size={24} />
            </a>
          </Link>
          <button className="text-blue-700" onClick={() => signOut()}>
            <FiLogOut size={24} />
          </button>
        </nav>
      </section>
    </header>
  );
}
