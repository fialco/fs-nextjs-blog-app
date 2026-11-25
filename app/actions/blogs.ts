"use server";

import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { addBlog, incrementLikes } from "../services/blogs";

interface Errors {
  title?: string;
  author?: string;
  url?: string;
}

export const createBlog = async (
  _prevState: {
    errors: Errors;
    values: { title: string; author: string; url: string };
    success: boolean;
  },
  formData: FormData,
) => {
  const session = await auth();
  if (!session) {
    redirect("/login");
  }

  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;

  const errors: Errors = {};

  if (!title || title.length < 5) {
    errors.title = "Title must be at least 5 characters";
  }

  if (!author || author.length < 5) {
    errors.author = "Author must be at least 5 characters";
  }

  if (!url || url.length < 5) {
    errors.url = "URL must be at least 5 characters";
  }

  if (Object.keys(errors).length !== 0) {
    return {
      errors,
      values: { title: title, author: author, url: url },
      success: false,
    };
  }

  await addBlog(title, author, url);

  revalidatePath("/blogs");
  return {
    errors: errors,
    values: { title: title, author: author, url: url },
    success: true,
  };
};

export const incrementBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  await incrementLikes(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};

export const searchBlogs = async (formData: FormData) => {
  const filter = formData.get("filter");
  redirect(filter ? `/blogs?filter=${filter}` : "/blogs");
};
