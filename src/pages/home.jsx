import { signOut, useSession } from "next-auth/client";

export default function Home() {
  const [session] = useSession();

  return (
    <div>
      <h1>Signed In!</h1>
      <p>{session.user.name}</p>
      <button onClick={() => signOut()}>Sign Out</button>
    </div>
  );
}
