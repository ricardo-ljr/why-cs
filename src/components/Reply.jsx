import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";

export function Reply({ reply, user }) {
  return (
    <article className="bg-white p-4 shadow-lg mb-4">
      <section className="mb-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img src={reply.user.image} alt="" className="w-8 rounded-full shadow-md" />
          <strong>{reply.user.name}</strong>
        </div>
        <div className="flex gap-3 items-center">
          <button className="flex gap-1 items-center">
            {reply.likes} <FiThumbsUp />
          </button>
          <button className="flex gap-1 items-center">
            {reply.dislikes} <FiThumbsDown />
          </button>
        </div>
      </section>
      <p>{reply.body}</p>
    </article>
  );
}
