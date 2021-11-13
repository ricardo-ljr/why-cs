import Head from "next/head";
import { getSession } from "next-auth/client";
import Image from "next/image";

import { GithubSignIn } from "../components/GitHubSignIn";
import { GoogleSignIn } from "../components/GoogleSignIn";

import logoImg from "../assets/logo.svg";

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Why CS? - Sign In</title>
      </Head>
      <div className="bg-gray-50 h-screen w-full max-w-md p-4 flex flex-wrap justify-center items-end mx-auto">
        <Image src={logoImg} alt="Why CS?" />

        <section>
          <GoogleSignIn />
          <GithubSignIn />
          <p className="text-sm text-center">
            By signing in you accept our{" "}
            <a href="#" className="text-blue-500 underline">
              Terms of use
            </a>{" "}
            and{" "}
            <a href="#" className="text-blue-500 underline">
              Privacy Policy
            </a>
            .
          </p>
        </section>
      </div>
    </>
  );
}

export const getServerSideProps = async ({ req, params }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/home",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};
