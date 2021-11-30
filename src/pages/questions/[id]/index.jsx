import Head from "next/head";
import { getSession } from "next-auth/client";

import { QuestionHeader } from "../../../components/QuestionHeader";
import { ActionBar } from "../../../components/ActionBar";
import { Reply } from "../../../components/Reply";

export default function Home({ session, question }) {
  return (
    <>
      <Head>
        <title>{question.title}</title>
      </Head>
      <div className="bg-gray-50 min-h-screen w-full max-w-md mx-auto flex flex-col">
        <QuestionHeader question={question} user={session.user} />
        <main className="mt-8 flex-grow mb-32">
          {question.replies.map((reply, i) => (
            <Reply key={i} reply={reply} />
          ))}
        </main>
        <ActionBar reply={session.user.email !== question.user.email} />
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
      question: {
        user: {
          name: "Student Name",
          image: "https://ui-avatars.com/api/?name=Student+Name&background=random",
          email: "student@name.com",
        },
        title: "How to swap two values in an array?",
        answered: false,
        course: "CS 142",
        replies: [
          {
            body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Ut aenean aenean risus ac. Proin diam tellus consequat nisi. Diam mi orci amet eu quis odio. Diam orci id eget tincidunt id erat sem imperdiet. At amet, urna, lectus nibh tortor elementum feugiat at. Gravida nisl, morbi fermentum habitant.",
            likes: 0,
            dislikes: 0,
            user: {
              name: "Student Name",
              image: "https://ui-avatars.com/api/?name=Student+Name&background=random",
            }
          },
          {
            body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Ut aenean aenean risus ac. Proin diam tellus consequat nisi. Diam mi orci amet eu quis odio. Diam orci id eget tincidunt id erat sem imperdiet. At amet, urna, lectus nibh tortor elementum feugiat at. Gravida nisl, morbi fermentum habitant.",
            likes: 1,
            dislikes: 0,
            user: {
              name: "Student Name",
              image: "https://ui-avatars.com/api/?name=Student+Name&background=random",
            }
          },
          {
            body: "orem ipsum dolor sit amet, consectetur adipiscing elit. Ut aenean aenean risus ac. Proin diam tellus consequat nisi. Diam mi orci amet eu quis odio. Diam orci id eget tincidunt id erat sem imperdiet. At amet, urna, lectus nibh tortor elementum feugiat at. Gravida nisl, morbi fermentum habitant.",
            likes: 0,
            dislikes: 1,
            user: {
              name: "Student Name",
              image: "https://ui-avatars.com/api/?name=Student+Name&background=random",
            }
          }
        ],
        body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut aenean aenean risus ac. Proin diam tellus consequat nisi. Diam mi orci amet eu quis odio. Diam orci id eget tincidunt id erat sem imperdiet. At amet, urna, lectus nibh tortor elementum feugiat at. Gravida nisl, morbi fermentum habitant. Ut a congue tristique eget non. Ullamcorper viverra curabitur diam libero lacus vel tellus sit. Pharetra, nibh morbi quam ut id duis iaculis. Nisi, sagittis consequat, congue suspendisse. Vestibulum elit adipiscing sed lectus sit. Lacinia fermentum duis ultrices neque donec id ut."
      },
    },
  };
};
