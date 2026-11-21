import Link from "next/link";
import { getUsers } from "../services/users";
import { Suspense } from "react";

const UsersContent = async () => {
  const users = await getUsers();

  return (
    <div>
      <h2>Users</h2>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <Link href={`/users/${user.id}`}>{user.name}</Link>
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
