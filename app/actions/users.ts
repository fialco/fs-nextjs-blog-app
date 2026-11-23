"use server";

import { db } from "@/db";
import { users } from "@/db/schema";
import bcrypt from "bcryptjs";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

interface Errors {
  username?: string;
  name?: string;
  password?: string;
  passwordConfirm?: string;
}

export const registerUser = async (
  _prevState: {
    errors: Errors;
    values: {
      username: string;
      name: string;
      password: string;
      passwordConfirm: string;
    };
  },
  formData: FormData,
) => {
  const username = (formData.get("username") as string)?.trim();
  const name = (formData.get("name") as string)?.trim();
  const password = formData.get("password") as string;
  const passwordConfirm = formData.get("passwordConfirm") as string;

  const existingUser = await db.query.users.findFirst({
    where: eq(users.username, username),
  });

  const errors: Errors = {};

  if (existingUser) {
    errors.username = "User with this username already exists";
  }

  if (!username || username.length < 4) {
    errors.username = "Username must be at least 4 characters";
  }

  if (!name) {
    errors.name = "Name must not be empty";
  }

  if (!password || password.length < 4) {
    errors.password = "Password must be at least 4 characters";
  }

  if (password !== passwordConfirm) {
    errors.passwordConfirm = "Passwords do not match";
  }

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      values: {
        username: username,
        name: name,
        password: password,
        passwordConfirm: passwordConfirm,
      },
    };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  await db.insert(users).values({ username, name, passwordHash });

  redirect("/login");
};
