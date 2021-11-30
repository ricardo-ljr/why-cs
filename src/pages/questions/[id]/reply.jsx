import Head from "next/head";
import { getSession } from "next-auth/client";

import { NewHeader } from "../../../components/NewHeader";

export default function New({ session }) {
  return (
    <>
      <Head>
        <title>Why CS? - Reply</title>
        <meta charset="utf-8" />
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <NewHeader reply/>
        <main className="mt-4 flex-grow mb-32">
          <textarea className="bg-transparent px-4 w-full outline-none resize-none" placeholder="Explain your question... "></textarea>
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
