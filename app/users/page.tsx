import Link from "next/link";
import { getUsers } from "../services/users";
import { Suspense } from "react";
import PageHeader from "../components/PageHeader";

const UsersContent = async () => {
  const users = await getUsers();

  return (
    <div>
      <PageHeader title="Users" />
      <ul className="space-y-2">
        {users.map((user) => (
          <li key={user.id} className="border rounded p-3 hover:bg-gray-50">
            <Link
              href={`/users/${user.username}`}
              className="text-blue-600 hover:underline"
            >
              {user.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

const UsersPage = async () => {
  return (
    <Suspense fallback={<p>Loading users...</p>}>
      <UsersContent />
    </Suspense>
  );
};

export default UsersPage;
