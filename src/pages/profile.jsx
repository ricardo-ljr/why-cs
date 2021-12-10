import Head from "next/head";
import { getSession } from "next-auth/client";

import { supabase } from '../services/supabase';
import { HomeHeader } from "../components/HomeHeader";
import { ActionBar } from "../components/ActionBar";

export default function Profile({ session, courses, userCourses }) {
  async function toggleUserCourse(event) {
    const courseId = event.target.id;
    const isUserCourse = !event.target.checked;

    if (isUserCourse) {
      await supabase
        .from('users_courses')
        .delete()
        .match({ user_id: session.user.id, course_id: courseId});

      return;
    }

    await supabase
      .from('users_courses')
      .insert({ user_id: session.user.id, course_id: courseId });
  }

  return (
    <>
      <Head>
        <title>Why CS? - Profile</title>
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <HomeHeader user={session.user} profile />
        <main className="mt-8 flex-grow mb-32 px-4">
          <h2 className="text-xl font-bold">Your Courses</h2>
          
          <section className="grid grid-cols-3 gap-4 mt-4">
            {courses.map((course) => (
                <label
                  key={course.id}
                  htmlFor={course.id}
                  className="flex gap-2 items-center bg-white px-4 py-2 rounded shadow-md"
                >
                  <input
                    type="checkbox"
                    name={course.id}
                    id={course.id}
                    defaultChecked={userCourses.includes(course.id)}
                    onChange={toggleUserCourse}
                  />
                  {course.name}
                </label>
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

  let { data: user } = await supabase.from('users').select('*').eq('email', session.user.email).single();
  session.user = user;

  let { data: courses } = await supabase.from('courses').select('*');
  const { data } = await supabase.from('users_courses').select('course_id').eq('user_id', user.id);
  const userCourses = data.map((course) => course.course_id);

  return {
    props: {
      session,
      courses,
      userCourses,
    },
  };
};
