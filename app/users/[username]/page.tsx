import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { getUserWithBlogs } from "../../services/users";
import PageHeader from "@/app/components/PageHeader";

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
      <PageHeader title={user.name} />
      <p className="text-gray-600 mb-4">username: {user.username}</p>
      <h3 className="text-xl font-semibold mb-2">Blogs</h3>
      <ul className="space-y-2">
        {user.blogs.map((blog) => (
          <li key={blog.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/blogs/${blog.id}`}
              className="text-blue-600 hover:underline"
            >
              {blog.title}
            </Link>
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
