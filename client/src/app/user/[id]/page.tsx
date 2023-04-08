import { SERVER_URL } from "@/constants/const";
import Subsite from "@/components/Subsite/Subsite";
import PostFeed from "@/components/Post/PostFeed";
import { IPostFeed } from "@/types/postFeed.type";

async function getUser(id: string) {
  const user = await fetch(`${SERVER_URL}/users/${id}`);

  if (!user.ok) {
    throw new Error("Failed to fetch data");
  }

  return user.json();
}

async function getUserPosts(id: string) {
  const userPosts = await fetch(`${SERVER_URL}/posts/user/${id}`);

  if (!userPosts.ok) {
    throw new Error("Failed to fetch data");
  }

  return userPosts.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const user = await getUser(params.id);
  const userPosts = await getUserPosts(params.id);

  return (
    <div className="subsite">
      <Subsite subsite={user} />
      {userPosts.map((post: IPostFeed) => (
        <PostFeed post={post} key={post.id} />
      ))}
    </div>
  );
}
