import { useRouter } from "next/dist/client/router";
import { FiThumbsDown, FiThumbsUp } from "react-icons/fi";
import { supabase } from "../services/supabase";

export function Reply({ reply, user }) {

  const router = useRouter()


  //  if reply.user.id == user.id {show button} 

  const incrementLike = async () => {
      await supabase.from('replies').update({likes: reply.likes + 1 }).match({id: reply.id})
      router.reload()
  }

  const decrementLike = async () => {
      await supabase.from('replies').update({likes: reply.dislikes - 1 }).match({id: reply.id})
      router.reload()
  }

  return (
    <article className="bg-white p-4 shadow-lg mb-4">
      <section className="mb-4 flex justify-between items-center">
        <div className="flex gap-3 items-center">
          <img src={reply.user.image} alt="" className="w-8 rounded-full shadow-md" />
          <strong>{reply.user.name}</strong>
        </div>
        <div className="flex gap-3 items-center">
        <div>
            <button className="flex gap-1 items-center" onClick={incrementLike}> 
              {reply.likes} <FiThumbsUp color={reply.likes > 0 ? "#0000FF" : ""}/>
            </button>
            <button className="flex gap-1 items-center" onClick={decrementLike}>
              {reply.dislikes} <FiThumbsDown color={reply.likes < 0 ? "#FF0000" : ""}/>
            </button>
            {reply.user.id === user.id && <button className="sm:container flex gap-4"  >Delete</button>}
          </div>
          
        </div>
      </section>
      <p>{reply.body}</p>
    </article>
  );
}
