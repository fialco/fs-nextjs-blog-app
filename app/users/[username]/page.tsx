import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getUserWithBlogs } from "../../services/users";

const UserContent = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  const { username } = await params;
  const user = await getUserWithBlogs(username);

  if (!user) {
    notFound();
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <p>username: {user.username}</p>
      <h3>Blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>
            <Link href={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UserPage = async (props: PageProps<"/users/[username]">) => {
  return (
    <Suspense fallback={<p>Loading user...</p>}>
      <UserContent params={props.params} />
    </Suspense>
  );
};

export default UserPage;
