import { Dialog, DialogPanel, DialogTitle,DialogBackdrop } from '@headlessui/react'
import React ,{ Dispatch, SetStateAction,useEffect }  from 'react'
import { IoCloseOutline } from "react-icons/io5";
import { Label } from './Label';
import { Textbox } from './Textbox';
import { Form, useActionData } from "@remix-run/react";


interface PlantDialogProps {
  isOpen: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  targetId: string;
  targetAction:"edit" | "create";
}

type ActionData = {
  error?: string;
};


const PlantDialog: React.FC<PlantDialogProps> = ({ isOpen, handleClose,targetId,targetAction }) => {
  const actionData = useActionData<ActionData>();
  function close() {
    handleClose(false)
  }

  // エラーがない場合にダイアログを閉じる
  useEffect(() => {
    if (actionData && !actionData.error) {
      handleClose(false);
    }
  }, [actionData, handleClose]);
  return (
    <>

        <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none" onClose={close}>
        <DialogBackdrop className="fixed inset-0 bg-white-500/50" />
          <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <DialogPanel
                transition
                className="w-full max-w-md rounded-xl bg-white-50 p-3 backdrop-blur-2xl">
                <div className='flex justify-between align-middle'>
                    <DialogTitle as="h3" className="text-white-500 font-bold ">
                        Add Plant
                    </DialogTitle>

                      <div className='hover:bg-white-200 rounded-full h-7 w-7 flex justify-center align-middle'>
                          <button className='text-2xl text-white-500' onClick={() => handleClose(false)}><IoCloseOutline className='text-white-500'/></button>
                      </div>
                </div>
                <Form method="post">
                  <input type="hidden" name="id" value={targetId} />
                  <input type="hidden" name="actionType" value={targetAction} />
                  <div className="mt-5">
                    <Label text="Name" className="text-white-500 text-s" />
                    <Textbox name="name" />
                  </div>

                  {actionData?.error && (
                    <div className="text-white-500 text-sm mt-4">{actionData.error}</div>
                  )}

                  <div className="mt-12 flex justify-center">
                    <button
                      type="submit"
                      className="bg-primary-700 text-white-100 w-2/4 h-10 rounded" 
                    >
                      Regist
                    </button>
                  </div>
                </Form>

              </DialogPanel>
            </div>
          </div>
        </Dialog>

    </>
  )
}

export default PlantDialog