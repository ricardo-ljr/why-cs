import Link from "next/link";
import { signOut } from "next-auth/client";
import { useRouter } from 'next/router';
import { FiBell, FiArrowLeft, FiLogOut } from "react-icons/fi";

export function Header({ title, searchQuestions = undefined }) {
  const router = useRouter();

  function backToExplore() {
    router.push('/explore');
  }

  if (title === 'Search') {
    return (
      <header className="bg-white w-full p-4 shadow-lg">
      <section className="flex gap-3 items-center">
        <button className="text-gray-800" onClick={backToExplore}>
          <FiArrowLeft size={24} />
        </button>
        <input
          type="text"
          className="w-full py-1 text-xl border-b-2 placeholder-gray-400 outline-none"
          placeholder="Search Why CS"
          onChange={searchQuestions}
        />
      </section>
    </header>
    );
  }

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
