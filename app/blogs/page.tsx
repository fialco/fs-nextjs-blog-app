import Link from "next/link";
import { Suspense } from "react";
import { searchBlogs } from "../actions/blogs";
import { getBlogs } from "../services/blogs";
import PageHeader from "../components/PageHeader";

const BlogsContent = async ({
  searchParams,
}: {
  searchParams: Promise<{ filter?: string }>;
}) => {
  const { filter } = await searchParams;
  const allBlogs = await getBlogs();

  const blogs = filter
    ? allBlogs.filter((blog) => blog.title.includes(filter))
    : allBlogs;

  return (
    <div>
      <PageHeader title="Blogs" />
      <form action={searchBlogs} className="mb-4 flex gap-4">
        <input type="text" name="filter" className="border rounded px-3 py-2" />
        <button
          type="submit"
          className="bg-gray-500 hover:bg-gray-400 px-3 py-2 rounded text-sm"
        >
          Search
        </button>
      </form>
      <ul className="space-y-2">
        {blogs
          ? blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <li
                  key={blog.id}
                  className="border rounded p-3 hover:bg-gray-400"
                >
                  <Link
                    href={`/blogs/${blog.id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {blog.title}
                  </Link>{" "}
                  by {blog.author} -- Likes: {blog.likes}
                </li>
              ))
          : []}
      </ul>
    </div>
  );
};

const BlogsPage = async (props: PageProps<"/blogs">) => {
  return (
    <Suspense fallback={<p>Loading blogs...</p>}>
      <BlogsContent searchParams={props.searchParams} />
    </Suspense>
  );
};

export default BlogsPage;
