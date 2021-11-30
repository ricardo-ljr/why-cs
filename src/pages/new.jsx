import Head from "next/head";
import { getSession } from "next-auth/client";

import { NewHeader } from "../components/NewHeader";
import { useState } from "react";

export default function New({ session }) {
  const [question, setQuestion] = useState({
    user: {
      name: session.user.name,
      image: session.user.image,
    },
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

  function handleSubmit() {
    console.log(question);
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

  return {
    props: {
      session,
    },
  };
};
