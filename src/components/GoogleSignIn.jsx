import Image from "next/image";
import googleImg from "../assets/google.svg";

export function GoogleSignIn() {
  return (
    <button className="bg-white hover:bg-gray-200 duration-200 w-full py-2 px-4 rounded-md shadow-md font-bold gap-4 text-lg flex justify-center items-center mb-4">
      <Image src={googleImg} alt="Why CS?" />
      Sign in with Google
    </button>
  );
}
