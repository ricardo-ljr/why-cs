import Head from "next/head";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useRouter } from "next/router";
import { getSession } from "next-auth/client";

import { NewHeader } from "../../../components/NewHeader";
import { supabase } from "../../../services/supabase";

export default function Edit({ session, question, courses }) {
  const router = useRouter();

  const [formData, setFormData] = useState(() => ({
    title: question.title,
    body: question.body,
    course: question.course,
  }));

  function setTitle(event) {
    const title = event.target.value;
    const edit = {...formData, title};
    setFormData(edit);
  }

  function setClass(event) {
    const course = event.target.value;
    const edit = {...formData, course};
    setFormData(edit);
  }

  function setBody(event) {
    const body = event.target.value;
    const edit = {...formData, body};
    setFormData(edit);
  }

  async function handleSubmit() {
    const { error } = await supabase.from('questions').update(formData).match({ id: question.id });

    if (error) {
      alert('Insertion failed');
      console.error(error.message);
      return;
    }

    alert('Question updated successfully!');

    router.push(`/questions/${question.id}`);
  }

  return (
    <>
      <Head>
        <title>Why CS? - Edit Question</title>
        <meta charset="utf-8" />
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <NewHeader user={session.user} setTitle={setTitle} setClass={setClass} handleSubmit={handleSubmit} edit question={formData} courses={courses}/>
        <main className="mt-4 flex-grow mb-32">
          <textarea className="bg-transparent px-4 w-full outline-none resize-none" onChange={setBody} placeholder="Explain your question... " value={formData.body}></textarea>
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

  const { data: question } = await supabase
    .from('questions')
    .select('*, user:user_id(*)')
    .eq('id', params.id)
    .single()

  if (session.user.id !== question.user.id) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  const { data: dbCourses } = await supabase.from('courses').select('name');
  const courses = dbCourses.map((course) => course.name);

  return {
    props: {
      session,
      question,
      courses,
    },
  };
};
