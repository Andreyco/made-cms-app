import { ActionFunction, Form } from "remix";
import { object, string, number, date, InferType } from "yup";
import { getUserResetSchema } from "~/utils/validationSchemas";

export const action: ActionFunction = async function ({ request }) {
  //   const form = await request.formData();
  //   const email = form.get("email")?.toString() ?? "";
  //   console.log(email);

  let userSchema = object({
    name: string().required(),
    age: number().required().positive().integer(),
    email: string().email(),
    website: string().url().nullable(),
    createdOn: date().default(() => new Date()),
  });

  let schema = getUserResetSchema();
  try {
    let user = await schema.validate({});
    console.log(user);
  } catch (error) {
    console.log(error);
  }

  // parse and assert validity
  try {
    const user = await userSchema.validate({});
    console.log(user);
  } catch (error) {
    console.log(error);
  }

  return null;
};

export default function PasswordResetRoute() {
  return (
    <Form method="post">
      <input name="email" type="email" placeholder="Email address"></input>
      <button type="submit">Send</button>
    </Form>
  );
}
