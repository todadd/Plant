import { Textbox } from "../components/Textbox"
import { Label } from "~/components/Label";
import {Button} from "~/components/Button";
import {GoogleButton} from "../components/GoogleButton"
import { Form } from "@remix-run/react";

export default function Register() {
  return (
    <div className="h-full flex flex-col px-5 justify-center ">
        <div className="h-1/6 w-full flex flex-col justify-center border-b border-dashed border-white-400 pb-5">
          <GoogleButton text="Sign up With Google"></GoogleButton>
        </div>
        <Form
         method="post"
         className="h-4/6 w-full flex mt-4 flex-col justify-around">
          <div className="h-4/6 w-full flex mt-4 flex-col justify-around">
            <div>
              <Label text="EMAIL" className="text-white-300 text-xs"></Label>
              <Textbox></Textbox>
            </div>
            <div>
              <Label text="PASSWORD" className="text-white-300 text-xs"></Label>
              <Textbox></Textbox>
            </div>
            <div className="flex flex-col mt-3">
              <Button text="Sign up With Email" className="bg-secondary-200 text-white-100 hover:bg-secondary-100 active:bg-secondary-300 text-xs hover:text-white-200"></Button>
            </div>
          </div>
        </Form>

    </div>
  );
}