import Head from "next/head";
import { getSession } from "next-auth/client";

import { HomeHeader } from "../components/HomeHeader";
import { ActionBar } from "../components/ActionBar";
import { HomeCard } from "../components/HomeCard";
import { Question } from "../components/Question";

const questions = [
  {
    user: {
      name: "Student Name",
      image: "https://ui-avatars.com/api/?name=Student+Name&background=random",
    },
    title: "How to swap two values in an array?",
    answered: false,
    course: "CS 142",
    replies: 0,
  },
  {
    user: {
      name: "Student Name",
      image: "https://ui-avatars.com/api/?name=Student+Name&background=random",
    },
    title: "How to free a memory address in C?",
    answered: false,
    course: "CS 224",
    replies: 0,
  },
  {
    user: {
      name: "Student Name",
      image: "https://ui-avatars.com/api/?name=Student+Name&background=random",
    },
    title: "How do I SSH into the lab machine?",
    answered: false,
    course: "CS 236",
    replies: 0,
  },
];

export default function Home({ session }) {
  return (
    <>
      <Head>
        <title>Why CS? - Home</title>
      </Head>
      <div className="bg-gray-50 min-h-full w-full max-w-md mx-auto flex flex-col">
        <HomeHeader user={session.user} />
        <main className="mt-8 flex-grow mb-32">
          <section className="w-full flex gap-5 px-4">
            <HomeCard type="questions" />
            <HomeCard type="replies" />
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-bold px-4">Be the First to Answer</h2>

            {questions.map((question, id) => (
              <Question
                key={id}
                question={question}
                answered={question.answered}
              />
            ))}
          </section>
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

  return {
    props: {
      session,
    },
  };
};
