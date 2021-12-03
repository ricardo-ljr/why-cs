import Head from "next/head";
import { getSession } from "next-auth/client";
import { v4 as uuid } from 'uuid';

import { supabase } from '../services/supabase';
import { HomeHeader } from "../components/HomeHeader";
import { ActionBar } from "../components/ActionBar";
import { HomeCard } from "../components/HomeCard";
import { Question } from "../components/Question";

export default function Home({ session, questions }) {
  return (
    <>
      <Head>
        <title>Why CS? - Home</title>
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <HomeHeader user={session.user} />
        <main className="mt-8 flex-grow mb-32">
          <section className="w-full flex gap-5 px-4">
            <HomeCard type="questions" />
            <HomeCard type="replies" />
          </section>
          {!!questions.length && <section className="mt-8">
            <h2 className="text-xl font-bold px-4">Be the First to Answer</h2>

            {questions.map((question) => (
              <Question
                key={question.id}
                question={question}
                answered={question.answered}
              />
            ))}
          </section>}
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

  let { data: user } = await supabase.from('users').select('*').eq('email', session.user.email).single();

  if (!user) {
    const { data } = await supabase.from('users').insert({ ...session.user, id: uuid() }).single();
    user = data;
  }

  session.user = user;

  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, title, course, user:user_id (id, name, image), answered, replies')
    .eq('replies', 0)
    .neq('user_id', user.id)

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
