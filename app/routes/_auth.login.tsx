import { Textbox } from "../components/Textbox"
import { Label } from "~/components/Label";
import {Button} from "~/components/Button";
import {GoogleButton} from "../components/GoogleButton"

export default function Login() {
  return (
    <div className="h-full flex flex-col px-5 justify-center ">
        <div className="h-1/6 w-full flex flex-col justify-center border-b border-dashed border-white-400 pb-5">
          <GoogleButton text="Sign in With Google"></GoogleButton>
        </div>
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
            <Button text="Sign in" className="bg-secondary-200 text-white-100 hover:bg-secondary-100 active:bg-secondary-300 text-xs hover:text-white-200"></Button>
            <Label text="Forgot Password" className="text-white-400 mx-auto mt-2.5 text-xs"></Label>
          </div>
        </div>
    </div>
  );
}