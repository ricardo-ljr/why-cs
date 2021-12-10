import Head from "next/head";
import { getSession } from "next-auth/client";

import { Header } from "../components/Header";
import { ActionBar } from "../components/ActionBar";
import { Question } from "../components/Question";
import { supabase } from "../services/supabase";

export default function Questions({ session, questions }) {
  return (
    <>
      <Head>
        <title>Why CS? - Questions</title>
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <Header title="My Questions" />
        <main className="mt-4 flex-grow mb-32">
          {questions.map((question) => (
            <Question
              key={question.id}
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

  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, title, course, user:user_id (id, name, image), answered, replies')
    .eq('user_id', user.id)

  if (error) {
    console.log(error);
  }

  return {
    props: {
      session,
      questions,
    },
  };
};
