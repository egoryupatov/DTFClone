import { SERVER_URL } from "@/constants/const";
import Subsite from "@/components/Subsite/Subsite";
import { IPostFeed } from "@/types/postFeed.type";
import PostFeed from "@/components/Post/PostFeed";

async function getCategory(id: string) {
  const category = await fetch(`${SERVER_URL}/category/${id}`);

  if (!category.ok) {
    throw new Error("Failed to fetch data");
  }

  return category.json();
}

async function getCategoryPosts(id: string) {
  const categoryPosts = await fetch(`${SERVER_URL}/posts/category/${id}`);

  if (!categoryPosts.ok) {
    throw new Error("Failed to fetch data");
  }

  return categoryPosts.json();
}

export default async function Page({ params }: { params: { id: string } }) {
  const category = await getCategory(params.id);
  const categoryPosts = await getCategoryPosts(params.id);

  return (
    <div className="subsite">
      <Subsite subsite={category} />
      {categoryPosts.map((post: IPostFeed) => (
        <PostFeed post={post} key={post.id} />
      ))}
    </div>
  );
}
