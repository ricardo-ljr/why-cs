import Head from "next/head";
import { getSession } from "next-auth/client";

import { HomeHeader } from "../components/HomeHeader";
import { ActionBar } from "../components/ActionBar";
import { HomeCard } from "../components/HomeCard";

export default function Home({ session }) {
  return (
    <>
      <Head>
        <title>Why CS? - Home</title>
      </Head>
      <div className="bg-gray-50 h-screen w-full max-w-md mx-auto flex flex-col">
        <HomeHeader user={session.user} />
        <main className="mt-8 flex-grow px-4">
          <section className="w-full flex gap-5">
            <HomeCard type="questions" />
            <HomeCard type="replies" />
          </section>
          <section className="mt-8">
            <h2 className="text-xl font-bold">Be the First to Answer</h2>
            {/* Questions */}
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
