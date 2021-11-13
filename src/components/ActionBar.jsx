import { useRouter } from "next/dist/client/router";
import Link from "next/link";
import { FiHome, FiCompass, FiSearch, FiEdit } from "react-icons/fi";

export function ActionBar() {
  const router = useRouter();

  return (
    <footer className="bg-white w-full p-4 border-t-2 border-gray-300 shadow-lg">
      <nav className="flex justify-around">
        <Link href="/home">
          <a
            className={`text-${
              router.pathname === "/home" ? "blue-700" : "gray-500"
            } flex flex-col items-center`}
          >
            <FiHome size={28} />
            <span>Home</span>
          </a>
        </Link>
        <Link href="/explore">
          <a
            className={`text-${
              router.pathname === "/explore" ? "blue-700" : "gray-500"
            } flex flex-col items-center`}
          >
            <FiCompass size={28} />
            <span>Explore</span>
          </a>
        </Link>
        <Link href="/search">
          <a
            className={`text-${
              router.pathname === "/search" ? "blue-700" : "gray-500"
            } flex flex-col items-center`}
          >
            <FiSearch size={28} />
            <span>Search</span>
          </a>
        </Link>
        <Link href="/post">
          <a
            className={`text-${
              router.pathname === "/post" ? "blue-700" : "gray-500"
            } flex flex-col items-center`}
          >
            <FiEdit size={28} />
            <span>Post</span>
          </a>
        </Link>
      </nav>
    </footer>
  );
}
