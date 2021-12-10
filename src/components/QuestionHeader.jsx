import { useRouter } from "next/router";
import { FiArrowLeft, FiMoreHorizontal, FiHelpCircle, FiCheckCircle } from "react-icons/fi";

export function QuestionHeader({ question, user }) {
  const router = useRouter();

  return (
    <header className="bg-white w-full p-4 shadow-lg">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button className="text-gray-800" onClick={router.back}>
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{question.course}</h1>
        </div>
        {user.email === question.user.email && <button className="text-gray-500">
          <FiMoreHorizontal size={24} />
        </button>}
      </section>
      <section className="mt-8 flex gap-4 items-center">
        <img src={question.user.image} alt="" className="w-24 rounded-full shadow-md" />
        <div className="flex flex-col">
          <strong className="text-2xl">{question.user.name}</strong>
          <small className="text-base">{question.user.email}</small>
        </div>
      </section>
      <section className="mt-4 flex justify-between items-center">
        <h1 className="text-lg font-bold">{question.title}</h1>
        <small className="flex items-center gap-1">
          {!question.answered ? (
            <>
              <FiHelpCircle className="text-yellow-500" /> Open
            </>
          ) : (
            <>
              <FiCheckCircle className="text-green-700" /> Answered
            </>
          )}
        </small>
      </section>
      <p className="mt-4">{question.body}</p>
    </header>
  );
}
