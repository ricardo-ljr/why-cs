import { signOut, useSession } from "next-auth/client";
import Image from "next/image";

import logoImg from "../assets/logo.svg";
import { GithubSignIn } from "../components/GitHubSignIn";
import { GoogleSignIn } from "../components/GoogleSignIn";

export default function SignIn() {
  const [session] = useSession();

  console.log(session);

  return (
    <div className="bg-gray-50 h-screen w-full max-w-md p-4 flex flex-wrap justify-center items-end mx-auto">
      <Image src={logoImg} alt="Why CS?" />

      <section>
        {session && (
          <button onClick={() => signOut()} className="p-4 bg-blue-400">
            Sign out
          </button>
        )}
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
  );
}
