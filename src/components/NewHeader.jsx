import { signOut } from "next-auth/client";
import { FiArrowLeft, FiSend } from "react-icons/fi";
import { useRouter } from "next/router";

const classes = [
  "CS 142",
  "CS 180",
  "CS 199R",
  "CS 201R",
  "CS 202",
  "CS 203",
  "CS 204",
  "CS 224",
  "CS 235",
  "CS 236",
  "CS 240",
  "CS 252",
  "CS 260",
  "CS 301R",
  "CS 312",
  "CS 324",
  "CS 329",
  "CS 330",
  "CS 340",
  "CS 345",
  "CS 355",
  "CS 356",
  "CS 393",
  "CS 401R",
  "CS 404",
  "CS 405",
  "CS 412",
  "CS 428",
  "CS 431",
  "CS 450",
  "CS 452",
  "CS 453",
  "CS 455",
  "CS 456",
  "CS 460",
  "CS 462",
  "CS 465",
  "CS 470",
  "CS 471",
  "CS 472",
  "CS 474",
  "CS 477R",
  "CS 480",
  "CS 481",
  "CS 482",
  "CS 483",
  "CS 486",
  "CS 493R",
  "CS 494",
  "CS 495",
  "CS 497R",
  "CS 498R",
  "CS 500",
  "CS 501R",
  "CS 502",
  "CS 513",
  "CS 580",
]

export function NewHeader({ setTitle, setClass, handleSubmit, reply = false }) {
  const router = useRouter()

  return (
    <header className="bg-white w-full p-4 shadow-lg">
      <section className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button className="text-gray-800" onClick={router.back}>
            <FiArrowLeft size={24} />
          </button>
          <h1 className="text-xl font-bold">{reply ? "Reply" : "Post new question" }</h1>
        </div>
        <button className="text-blue-700" onClick={handleSubmit}>
          <FiSend size={24} />
        </button>
      </section>
      {!reply && <section className="mt-8 flex flex-col gap-4">
        <input type="text" placeholder="Title" className="w-full outline-none" onChange={setTitle} />
        <select className="w-full text-gray-400 px-0 outline-none" onChange={setClass}>
            <option defaultChecked value="">Class</option>
          {classes.map((course) => (
            <option key={course} value={course}>{course}</option>
          ))}
        </select>
      </section>}
    </header>
  );
}
