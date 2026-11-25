"use client";

import { useActionState } from "react";
import { registerUser } from "../actions/users";
import PageHeader from "../components/PageHeader";
import FormField from "../components/FormField";

const RegisterPage = () => {
  const initialState = {
    errors: {
      username: undefined,
      name: undefined,
      password: undefined,
      passwordConfirm: undefined,
    },
    values: { username: "", name: "", password: "", passwordConfirm: "" },
  };

  const [state, formAction] = useActionState(registerUser, initialState);

  return (
    <div>
      <PageHeader title="Register" />
      <form action={formAction} className="space-y-4">
        <FormField
          label="Username"
          name="username"
          required
          defaultValue={state.values.username}
          errorMessage={state.errors.username}
        />
        <FormField
          label="Name"
          name="name"
          required
          defaultValue={state.values.name}
          errorMessage={state.errors.name}
        />
        <FormField
          label="Password"
          name="password"
          type="password"
          required
          defaultValue={state.values.password}
          errorMessage={state.errors.password}
        />
        <FormField
          label="Confirm password"
          name="passwordConfirm"
          type="password"
          required
          defaultValue={state.values.passwordConfirm}
          errorMessage={state.errors.passwordConfirm}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterPage;
