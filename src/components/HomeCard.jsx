import { FiHelpCircle, FiCheckCircle } from "react-icons/fi";
import Link from "next/link";

export function HomeCard({ type }) {
  if (type === "questions") {
    return (
      <Link href="/questions">
        <a className="w-1/2 flex flex-col items-center gap-2 p-4 bg-white shadow-lg rounded-lg">
          <FiHelpCircle size={48} className="text-yellow-500" />
          <span className="text-lg font-bold">My Questions</span>
        </a>
      </Link>
    );
  }

  return (
    <Link href="/replies">
      <a className="w-1/2 flex flex-col items-center gap-2 p-4 bg-white shadow-lg rounded-lg">
        <FiCheckCircle size={48} className="text-green-600" />
        <span className="text-lg font-bold">My Replies</span>
      </a>
    </Link>
  );
}
