import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { incrementBlogLikes } from "@/app/actions/blogs";
import { Suspense } from "react";

const BlogContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h2>{blog.title}</h2>
      <p>Author: {blog.author}</p>
      <p>URL: {blog.url}</p>
      <p>Likes: {blog.likes}</p>
      <form action={incrementBlogLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <button type="submit">Like</button>
      </form>
    </div>
  );
};

/* Newer Next.JS versions using instant navigation give error 'Next.js encountered uncached or runtime data during prerendering'
without Suspense while using params.
More info: https://nextjs.org/docs/app/guides/instant-navigation*/
const BlogPage = async (props: PageProps<"/blogs/[id]">) => {
  return (
    <Suspense fallback={<p>Loading blog...</p>}>
      <BlogContent params={props.params} />
    </Suspense>
  );
};

export default BlogPage;
