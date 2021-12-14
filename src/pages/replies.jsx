import Head from "next/head";
import { getSession } from "next-auth/client";

import { Header } from "../components/Header";
import { supabase } from "../services/supabase";
import { Question } from "../components/Question";
import { ActionBar } from "../components/ActionBar";

export default function Replies({ session, questions }) {
  
  return (
    <>
      <Head>
        <title>Why CS? - Replies</title>
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <Header title="My Replies" />
        <main className="mt-4 flex-grow mb-32">
          {questions.map((question, id) => (
            <Question
              key={id}
              question={question}
              answered={question.answered}
            />
          ))}
        </main>
        <ActionBar />
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

  let { data: questions } = await supabase.from('replies').select('question:question_id (*, user:user_id (*))').eq('user_id', user.id);
  questions = questions.map((record) => ({ ...record.question }));
  console.log(questions);

  return {
    props: {
      session,
      questions,
    },
  };
};
