import Head from "next/head";
import { useState } from "react";
import { getSession } from "next-auth/client";

import { NewHeader } from "../../../components/NewHeader";
import { supabase } from "../../../services/supabase";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";

export default function New({ session, questionId }) {
  const router = useRouter();
  const [body, setBody] = useState("");

  async function handleSubmit() {
    const reply = {
      id: uuid(),
      user_id: session.user.id,
      question_id: questionId,
      body,
    }

    const { error } = await supabase.from('replies').insert([reply]);

    if (error) {
      alert('Insertion failed');
      console.error(error.message);
      return;
    }

    const { data: question } = await supabase.from('questions').select('*').eq('id', questionId).single();

    await supabase.from('questions').update({ replies: question.replies + 1 }).eq('id', questionId);

    router.push(`/questions/${questionId}`);
  }

  return (
    <>
      <Head>
        <title>Why CS? - Reply</title>
        <meta charset="utf-8" />
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <NewHeader reply handleSubmit={handleSubmit} />
        <main className="mt-4 flex-grow mb-32">
          <textarea
            className="bg-transparent px-4 w-full outline-none resize-none"
            placeholder="Explain your question... "
            onChange={(event) => setBody(event.target.value)}
          />
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
      questionId: params.id,
    },
  };
};
