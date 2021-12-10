import Head from "next/head";
import { getSession } from "next-auth/client";
import { v4 as uuid } from 'uuid';

import { supabase } from '../services/supabase';
import { HomeHeader } from "../components/HomeHeader";
import { ActionBar } from "../components/ActionBar";
import { HomeCard } from "../components/HomeCard";
import { Question } from "../components/Question";

export default function Home({ session, questions, feed }) {
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

          {!!feed.length && <section className="mt-8">
            <h2 className="text-xl font-bold px-4">Questions in Your Courses</h2>
            {feed.map((question) => (
              <Question
                key={question.id}
                question={question}
                answered={question.answered}
              />
            ))}
          </section>}
          
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
    .order('created_at')
    .limit(3);

  if (error) {
    console.error(error);
  }

  const { data } = await supabase.from('users_courses').select('course:course_id (name)').eq('user_id', user.id);
  const user_courses = data.map(({ course }) => course.name);

  let { data: feed } = await supabase
  .from('questions')
  .select('id, title, course, user:user_id (id, name, image), answered, replies')
  .neq('user_id', user.id);

  feed = feed.filter((question) => user_courses.includes(question.course));

  return {
    props: {
      session,
      questions,
      feed,
    },
  };
};
