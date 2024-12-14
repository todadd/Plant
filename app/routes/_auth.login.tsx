import { Textbox } from "../components/Textbox"
import { Label } from "~/components/Label";
import {Button} from "~/components/Button";
import {GoogleButton} from "../components/GoogleButton"
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
        <div className="h-1/6 w-full flex flex-col justify-center border-b border-dashed border-white-400 pb-5">
          <GoogleButton text="Sign in With Google"></GoogleButton>
        </div>
        {actionData?.error && (
         <div className="text-red-500 text-sm mb-4">{actionData.error}</div>
        )}
        <Form method="post" className="h-4/6 w-full flex mt-4 flex-col justify-around">
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
          <div>
            <Label text="PASSWORD" className="text-white-300 text-xs"></Label>
            <Textbox
              id="password"         
              name="password"
              type="password"
              ></Textbox>
          </div>
          <div className="flex flex-col mt-3">
            <Button text="Sign in" className="bg-secondary-200 text-white-100 hover:bg-secondary-100 active:bg-secondary-300 text-xs hover:text-white-200"></Button>
            <Label text="Forgot Password" className="text-white-400 mx-auto mt-2.5 text-xs"></Label>
          </div>
        </div>
        </Form>
    </div>
  );
}