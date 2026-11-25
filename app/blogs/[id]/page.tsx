import { notFound } from "next/navigation";
import { getBlogById } from "../../services/blogs";
import { incrementBlogLikes } from "@/app/actions/blogs";
import { Suspense } from "react";
import PageHeader from "@/app/components/PageHeader";
import SubmitButton from "@/app/components/SubmitButton";

const BlogContent = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const blog = await getBlogById(Number(id));

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <PageHeader title={blog.title} />
      <p className="mb-4 font-semibold">Author: {blog.author}</p>
      <p className="mb-4 font-semibold">
        URL:{" "}
        <a href={blog.url} className="text-blue-600 hover:underline">
          {blog.url}
        </a>{" "}
      </p>
      <p className="mb-4 font-semibold">Likes: {blog.likes}</p>
      <form action={incrementBlogLikes}>
        <input type="hidden" name="id" value={blog.id} />
        <SubmitButton label="Like" />
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
