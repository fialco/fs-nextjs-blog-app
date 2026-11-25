"use client";

import { useActionState, useEffect } from "react";
import { createBlog } from "../../actions/blogs";
import { useNotification } from "@/app/components/NotificationContext";
import { useRouter } from "next/navigation";
import FormField from "@/app/components/FormField";
import PageHeader from "@/app/components/PageHeader";
import SubmitButton from "@/app/components/SubmitButton";

const NewBlog = () => {
  const initialState = {
    errors: { title: undefined, author: undefined, url: undefined },
    values: { title: "", author: "", url: "" },
    success: false,
  };

  const [state, formAction] = useActionState(createBlog, initialState);
  const { showNotification } = useNotification();
  const router = useRouter();

  useEffect(() => {
    if (state.success) {
      showNotification("blog created");
      router.push("/blogs");
    }
  }, [state, showNotification, router]);

  return (
    <div>
      <PageHeader title="Create a new blog" />
      <form action={formAction} className="space-y-4">
        <FormField
          label="Title"
          name="title"
          required
          defaultValue={state.values.title}
          errorMessage={state.errors.title}
        />
        <FormField
          label="Author"
          name="author"
          required
          defaultValue={state.values.author}
          errorMessage={state.errors.author}
        />
        <FormField
          label="Url"
          name="url"
          required
          defaultValue={state.values.url}
          errorMessage={state.errors.url}
        />
        <SubmitButton label="Create" />
      </form>
    </div>
  );
};

export default NewBlog;
