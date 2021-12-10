import Head from "next/head";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

import { NewHeader } from "../components/NewHeader";
import { supabase } from "../services/supabase";

export default function New({ session }) {
  const router = useRouter();

  const [question, setQuestion] = useState({
    id: uuid(),
    user_id: session.user.id,
    title: "",
    body: "",
    answered: false,
    course: "",
  });

  function setTitle(event) {
    const title = event.target.value;
    const newQuestion = {...question, title};
    setQuestion(newQuestion);
  }

  function setClass(event) {
    const course = event.target.value;
    const newQuestion = {...question, course};
    setQuestion(newQuestion);
  }

  function setBody(event) {
    const body = event.target.value;
    const newQuestion = {...question, body};
    setQuestion(newQuestion);
  }

  async function handleSubmit() {
    const { data, error } = await supabase.from('questions').insert([question]);

    if (error) {
      alert('Insertion failed');
      console.error(error.message);
      return;
    }

    router.push(`/questions/${question.id}`);
  }

  return (
    <>
      <Head>
        <title>Why CS? - New Question</title>
        <meta charset="utf-8" />
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <NewHeader user={session.user} setTitle={setTitle} setClass={setClass} handleSubmit={handleSubmit} />
        <main className="mt-4 flex-grow mb-32">
          <textarea className="bg-transparent px-4 w-full outline-none resize-none" onChange={setBody} placeholder="Explain your question... "></textarea>
        </main>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: user } = await supabase.from('users').select('*').eq('email', session.user.email).single();
  session.user = user;

  return {
    props: {
      session,
    },
  };
};
