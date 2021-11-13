import { FiCheckCircle, FiHelpCircle, FiMessageSquare } from "react-icons/fi";
import Link from "next/link";

export function Question({ question, answered = false }) {
  return (
    <Link href="/">
      <a>
        <article className="mt-2 w-full p-4 bg-white shadow-lg">
          <div className="flex justify-between mb-4">
            <span className="flex items-center gap-1">
              <img
                src={question.user.image}
                alt=""
                className="w-6 rounded-full shadow-lg"
              />
              <small className="font-bold">{question.user.name}</small>
            </span>
            <small className="flex items-center gap-1">
              {!answered ? (
                <>
                  <FiHelpCircle className="text-yellow-500" /> Open
                </>
              ) : (
                <>
                  <FiCheckCircle className="text-green-700" /> Answered
                </>
              )}
            </small>
          </div>

          <div className="flex justify-between">
            <strong>{question.title}</strong>
            <small className="flex items-center gap-1 text-gray-500">
              {question.replies} <FiMessageSquare />
            </small>
          </div>

          <small className="font-bold text-gray-600">
            {question.course.toUpperCase()}
          </small>
        </article>
      </a>
    </Link>
  );
}
