import Link from "next/link";
import { getBlogs } from "../services/blogs";
import { searchBlogs } from "../actions/blogs";
import { Suspense } from "react";

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
      <h2>Blogs</h2>
      <form action={searchBlogs}>
        <input type="text" name="filter" />
        <button type="submit">Search</button>
      </form>
      <ul>
        {blogs
          ? blogs
              .sort((a, b) => b.likes - a.likes)
              .map((blog) => (
                <li key={blog.id}>
                  <Link href={`/blogs/${blog.id}`}>{blog.title}</Link> by{" "}
                  {blog.author} -- Likes: {blog.likes}
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
