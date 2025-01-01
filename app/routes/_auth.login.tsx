import { Textbox } from "../components/Textbox"
import { Label } from "~/components/Label";
import { prisma } from "../../prisma/prisma";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"; // JWTを利用
import { createSession } from "../utils/session.server"; 
import { ActionFunction, json } from "@remix-run/node";
import { Form, useActionData } from "@remix-run/react";


type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  if (!email || !password) {
    return json<ActionData>({ error: "Email and Password are required" }, { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !user.password) {
    return json<ActionData>({ error: "Invalid email or password" }, { status: 400 });
  }

  // パスワードを検証
  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    return json<ActionData>({ error: "Invalid email or password" }, { status: 400 });
  }

  // JWTを生成
  const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET || "default_secret", {
    expiresIn: "1h", // トークンの有効期限
  });

  // セッションを作成してリダイレクト
  return createSession(token, "/"); // ログイン後のリダイレクト先
};

export default function Login() {
  const actionData = useActionData<ActionData>();
  return (
    <div className="h-full flex flex-col px-5 justify-center ">
        {actionData?.error && (
         <div className="text-red-500 text-sm mb-4">{actionData.error}</div>
        )}
        <Form method="post" className="h-full w-full flex mt-4 flex-col justify-around">
          <div className="h-4/6 w-full flex mt-4 flex-col justify-around">
            <div>
              <Label text="EMAIL" className="text-white-300 text-xs"></Label>
              <Textbox
                    id="email"
                    name="email"
                    type="email"
                    required
                    ></Textbox>
            </div>
            <div className="mt-4">
              <Label text="PASSWORD" className="text-white-300 text-xs"></Label>
              <Textbox
                id="password"         
                name="password"
                type="password"
                ></Textbox>
            </div>
            <div className="flex flex-col mt-12">
              <button className="h-10 rounded bg-secondary-200 text-white-500 hover:bg-secondary-100 active:bg-secondary-300 text-xs hover:text-white-200">Sign in</button>
              <Label text="Forgot Password" className="text-white-400 mx-auto mt-2.5 text-xs"></Label>
            </div>
          </div>
        </Form>
    </div>
  );
}