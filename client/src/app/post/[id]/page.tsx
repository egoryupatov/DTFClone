import { SERVER_URL } from "@/constants/const";
import Post from "@/components/Post/Post";
import Comments from "@/components/Comments/Comments";

async function getPost(id: string) {
  const post = await fetch(`${SERVER_URL}/posts/${id}`);

  if (!post.ok) {
    throw new Error("Failed to fetch data");
  }

  return post.json();
}

async function getComments(id: string) {
  const post = await fetch(`${SERVER_URL}/comments/posts/${id}`);

  if (!post.ok) {
    throw new Error("Failed to fetch data");
  }

  return post.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);
  const comments = await getComments(params.id);

  return (
    <>
      <Post post={post} />
      <Comments totalNumber={post.comments} comments={comments} />
    </>
  );
}
