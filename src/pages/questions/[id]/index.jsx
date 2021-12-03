import Head from "next/head";
import { getSession } from "next-auth/client";

import { QuestionHeader } from "../../../components/QuestionHeader";
import { ActionBar } from "../../../components/ActionBar";
import { Reply } from "../../../components/Reply";
import { supabase } from "../../../services/supabase";

export default function Home({ session, question }) {
  return (
    <>
      <Head>
        <title>{question.title}</title>
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <QuestionHeader question={question} user={session.user} />
        <main className="mt-8 flex-grow mb-32">
          {question.replies.map((reply, i) => (
            <Reply key={i} reply={reply} />
          ))}
        </main>
        <ActionBar reply={session.user.email !== question.user.email} />
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

  const { data: question, error: questionError } = await supabase
    .from('questions')
    .select('*, user:user_id(*)')
    .eq('id', params.id)
    .single()

  if (questionError) {
    console.log(questionError);
  }

  const { data: replies, error: repliesError } = await supabase
    .from('replies')
    .select('*, user:user_id(*)')
    .eq('question_id', params.id)

  if (repliesError) {
    console.log(repliesError);
  }

  return {
    props: {
      session,
      question: {
        ...question,
        replies,
      },
    },
  };
};
