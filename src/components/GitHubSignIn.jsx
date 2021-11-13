import Image from "next/image";
import { signIn } from "next-auth/client";

import githubImg from "../assets/github.svg";

export function GithubSignIn() {
  return (
    <button
      className="bg-gray-900 hover:bg-gray-700 duration-200 text-white w-full py-2 px-4 rounded-md shadow-md font-bold gap-4 text-lg flex justify-center items-center mb-4"
      onClick={() => signIn("github")}
    >
      <Image src={githubImg} alt="Why CS?" />
      Sign in with Google
    </button>
  );
}
