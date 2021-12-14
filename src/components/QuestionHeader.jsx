import { useRouter } from "next/router";
import { FiArrowLeft, FiMoreHorizontal, FiHelpCircle, FiCheckCircle } from "react-icons/fi";

export function QuestionHeader({ question, user, open, toggleMenu, editQuestion, deleteQuestion, toggleQuestion }) {
  const router = useRouter();

  function back() {
    if (user.email === question.user.email) {
      router.push('/my-questions');
      return;
    }

    router.push('/explore');
  }

  return (
    <>
      <section className={`
        ${open ? 'scale-y-1' : 'scale-y-0'}
        transform
        top-12
        right-0
        w-full
        bg-white
        shadow-md
        rounded
        p-4
        fixed
        overflow-auto
        ease-in-out
        transition-all
        duration-300
        origin-top
        z-30
        flex
        flex-col
        items-end
        text-lg`
      }>
        <button onClick={editQuestion}>Edit</button>
        <button className="text-green-600" onClick={toggleQuestion}>{question.answered ? 'Open' : 'Close'}</button>
        <button className="text-red-600" onClick={deleteQuestion}>Delete</button>
      </section>
      <header className="bg-white w-full p-4 shadow-lg">
        <section className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <button className="text-gray-800" onClick={back}>
              <FiArrowLeft size={24} />
            </button>
            <h1 className="text-xl font-bold">{question.course}</h1>
          </div>
          {user.email === question.user.email && <button className="text-gray-500" onClick={() => toggleMenu(!open)}>
            <FiMoreHorizontal size={24} />
          </button>}
        </section>
        <section className="mt-8 flex gap-4 items-center" onClick={() => toggleMenu(false)}>
          <img src={question.user.image} alt="" className="w-24 rounded-full shadow-md" />
          <div className="flex flex-col">
            <strong className="text-2xl">{question.user.name}</strong>
            <small className="text-base">{question.user.email}</small>
          </div>
        </section>
        <section className="mt-4 flex justify-between items-center" onClick={() => toggleMenu(false)}>
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
        <p className="mt-4" onClick={() => toggleMenu(false)}>{question.body}</p>
      </header>
    </>
  );
}
