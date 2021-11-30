import Head from "next/head";
import { getSession } from "next-auth/client";

import { Header } from "../components/Header";
import { ActionBar } from "../components/ActionBar";

export default function New({ session }) {
  return (
    <>
      <Head>
        <title>Why CS? - New Question</title>
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <Header title="New Question" />
        <main className="mt-4 flex-grow mb-32">{/* Questions */}</main>
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
