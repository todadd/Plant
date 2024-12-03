import { Textbox } from "../components/Textbox"
import { Label } from "~/components/Label";
import {Button} from "~/components/Button";
import {GoogleButton} from "../components/GoogleButton"
import {useActionData ,Form } from "@remix-run/react";
import { prisma } from "../../prisma/prisma"
import bcrypt from "bcryptjs"
import { json, redirect, ActionFunction } from "@remix-run/node";

type ActionData = {
  error?: string;
};

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const email = formData.get("email") as string | null;
  const password = formData.get("password") as string | null;

  // 入力チェック
  if (!email || !password) {
    return json<ActionData>({ error: "Email and Password are required" }, { status: 400 });
  }

  // パスワードをハッシュ化
  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // Prismaを使って新規ユーザーを登録
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      },
    });

    // 成功時にリダイレクト
    return redirect("/"); // ユーザー登録後のリダイレクト先
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    if (error.code === "P2002") {
      // ユニーク制約違反（例: email重複）
      return json<ActionData>({ error: "Email is already registered" }, { status: 400 });
    }
    throw error; // その他のエラー
  }
};

export default function Register() {
  const actionData = useActionData<ActionData>();
  return (
    <div className="h-full flex flex-col px-5 justify-center ">
        <div className="h-1/6 w-full flex flex-col justify-center border-b border-dashed border-white-400 pb-5">
          <GoogleButton text="Sign up With Google"></GoogleButton>
        </div>
        {actionData?.error && (
        <div className="text-red-500 text-sm mb-4">{actionData.error}</div>
        )}
        <Form
         method="post"
         className="h-4/6 w-full flex mt-4 flex-col justify-around">
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
                required></Textbox>
            </div>
            <div className="flex flex-col mt-3">
              <Button text="Sign up With Email" className="bg-secondary-200 text-white-100 hover:bg-secondary-100 active:bg-secondary-300 text-xs hover:text-white-200"></Button>
            </div>
          </div>
        </Form>
    </div>
  );
}