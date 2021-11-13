import Link from "next/link";
import { signOut } from "next-auth/client";
import { FiBell, FiLogOut } from "react-icons/fi";

export function HomeHeader({ user }) {
  return (
    <header className="bg-white w-full p-4 shadow-lg">
      <section className="flex justify-between items-center">
        <h1 className="text-xl font-bold">Home</h1>
        <nav className="flex gap-4">
          <Link href="/">
            <a className="text-blue-700">
              <FiBell size={24} />
            </a>
          </Link>
          <button className="text-blue-700" onClick={() => signOut()}>
            <FiLogOut size={24} />
          </button>
        </nav>
      </section>
      <section className="mt-8 flex gap-4 items-center">
        <img src={user.image} alt="" className="w-24 rounded-full shadow-md" />
        <div className="flex flex-col">
          <strong className="text-2xl">{user.name}</strong>
          <small className="text-base">{user.email}</small>
        </div>
      </section>
    </header>
  );
}
