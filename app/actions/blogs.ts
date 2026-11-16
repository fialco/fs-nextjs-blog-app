"use server";

import { redirect } from "next/navigation";
import { addBlog, incrementLikes } from "../services/blogs";
import { revalidatePath } from "next/cache";

export const createBlog = async (formData: FormData) => {
  const title = formData.get("title") as string;
  const author = formData.get("author") as string;
  const url = formData.get("url") as string;
  addBlog(title, author, url);

  revalidatePath("/blogs");
  redirect("/blogs");
};

export const incrementBlogLikes = async (formData: FormData) => {
  const id = Number(formData.get("id"));
  incrementLikes(id);
  revalidatePath(`/blogs/${id}`);
  revalidatePath("/blogs");
};

export const searchBlogs = async (formData: FormData) => {
  const filter = formData.get("filter");
  redirect(filter ? `/blogs?filter=${filter}` : "/blogs");
};
