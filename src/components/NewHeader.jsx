import { FiArrowLeft, FiSend } from "react-icons/fi";
import { useRouter } from "next/router";

export function NewHeader({ courses, setTitle, setClass, handleSubmit, reply = false, question = null }) {
  const router = useRouter()

  return (
    <header className="bg-white w-full p-4 shadow-lg">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button className="text-gray-800" onClick={router.back}>
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{reply ? "Reply" : !!question ? "Edit question" : "Post new question" }</h1>
        </div>
        <button className="text-blue-700" onClick={handleSubmit}>
          <FiSend size={24} />
        </button>
      </section>
      {!reply && <section className="mt-8 flex flex-col gap-4">
        <input type="text" placeholder="Title" className="w-full outline-none" onChange={setTitle} defaultValue={!!question ? question.title : ''}/>
        <select className="w-full text-gray-400 px-0 outline-none bg-white" onChange={setClass}>
            {!question && <option defaultChecked value="">Class</option>}
          {courses.map((course) => (
            <option key={course} value={course} defaultChecked={!!question && question.course === course}>{course}</option>
          ))}
        </select>
      </section>}
    </header>
  );
}
