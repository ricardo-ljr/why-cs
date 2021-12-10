import Head from "next/head";
import { useState } from "react";
import { getSession } from "next-auth/client";

import { Header } from "../components/Header";
import { ActionBar } from "../components/ActionBar";
import { Question } from "../components/Question";
import { supabase } from "../services/supabase";

export default function Search({ session, questions }) {
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  function searchQuestions(event) {
    const search = event.target.value.toLowerCase();

    if (!search) {
      setFilteredQuestions([]);
    }

    const results = questions.filter((question) => question.title.toLowerCase().includes(search) || question.course.toLowerCase().includes(search));

    setFilteredQuestions(results);
  }

  return (
    <>
      <Head>
        <title>Why CS? - Search</title>
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <Header title="Search" searchQuestions={searchQuestions} />
        <main className="mt-4 flex-grow mb-32">
          {filteredQuestions.map((question, id) => (
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

  const { data: questions, error } = await supabase
    .from('questions')
    .select('id, title, course, user:user_id (id, name, image), answered, replies')
    .neq('user_id', user.id)

  if (error) {
    console.error(error);
  }

  return {
    props: {
      session,
      questions,
    },
  };
};
