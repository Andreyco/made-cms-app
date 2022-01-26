import { ActionFunction, Form } from "remix";
import { databaseService } from "~/services/databaseService";
import { getUserRegistrationSchema } from "~/utils/validationSchemas";

let a;
a = 1;

function sucet(a: number, b: number): number {
  let c = a + b;

  return c;
}

export let action: ActionFunction = async function ({ request }) {
  let form = await request.formData();

  let schema = getUserRegistrationSchema();
  try {
    let user = await schema.validate({
      password: form.get("password")?.toString(),
      confirmPassword: form.get("confirmPassword")?.toString(),
      email: form.get("email")?.toString(),
    });
    let response = await databaseService().auth.signUp(user);
    console.log(response);
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default function AdminRegisterRoute() {
  return (
    <Form method="post">
      <input
        name="email"
        type="text"
        placeholder="Email Address"
        autoComplete="username"
      ></input>
      <input
        name="password"
        type="password"
        placeholder="Password"
        autoComplete="new-password"
      ></input>
      <input
        name="confirmPassword"
        type="password"
        placeholder="Confirm Password"
        autoComplete="new-password"
      ></input>
      <button type="submit">Register</button>
    </Form>
  );
}
