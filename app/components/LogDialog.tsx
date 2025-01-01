import { Dialog, DialogPanel, DialogTitle,DialogBackdrop } from '@headlessui/react'
import React ,{ Dispatch, SetStateAction,useEffect }  from 'react'
import { IoCloseOutline } from "react-icons/io5";
import Select from './Select';
import { Label } from './Label';
import { Textbox } from './Textbox';
import Datepicker from './DatepPicker';
import { Form, useActionData} from "@remix-run/react";
import { Log } from "~/routes/app._index";



interface LogDialogProps {
  isOpen: boolean;
  handleClose: Dispatch<SetStateAction<boolean>>;
  targetId: string;
  targetAction:"edit" | "create";
  selectOptions: { value: string; name: string }[];
  targetLog: Log;
}

type ActionData = {
  error?: string;
};

const LogDialog: React.FC<LogDialogProps> = ({ isOpen, handleClose,targetId,targetAction,selectOptions,targetLog}) => {
  const actionData = useActionData<ActionData>();
  const[dateValue, setDateValue] = React.useState(targetLog.careDate);
  const[detailValue, setDetailValue] = React.useState(targetLog.detail);
  const careValue = targetLog.care;

  const options = selectOptions;
  if(exittCare()){
    options.push({value:careValue,name:careValue});
  }

  function exittCare():boolean{
    const care = options.find((option) => option.value === careValue);
    return !care;
  }

  function close() {
    handleClose(false)
  }

  // エラーがない場合にダイアログを閉じる
  useEffect(() => {
    if (actionData && !actionData.error) {
      handleClose(false);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [actionData, handleClose]);

  useEffect(() => {
    setDateValue(targetLog.careDate);
    setDetailValue(targetLog.detail);
  },[targetLog])
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
                    Add care log
                </DialogTitle>
                <div className='hover:bg-white-200 rounded-full h-7 w-7 flex justify-center align-middle'>
                    <button className='text-2xl text-white-500' onClick={() => handleClose(false)}><IoCloseOutline className='text-white-500'/></button>
                </div>
            </div>
            <Form method="post">
              <input type="hidden" name="plantId" value={targetId} />
              <input type="hidden" name="logId" value={targetLog.id} />
              <input type="hidden" name="actionType" value={targetAction} />
              <div className='mt-5'>
                  <Label text='Care' className="text-white-500 text-s"></Label>
                  <Datepicker value={dateValue} name="careDate" onChange={setDateValue}></Datepicker>
              </div>
              <div className='mt-5'>
                  <Label text='Care' className="text-white-500 text-s"></Label>
                  <Select options={options} selected={careValue} name={"care"}></Select>
              </div>
              <div className='mt-5'>
                  <Label text='Detail' className="text-white-500 text-s"></Label>
                  <Textbox name="detail" value={detailValue} onChange={(e) => setDetailValue(e.target.value)}></Textbox>
              </div>

              {actionData?.error && (
                    <div className="text-white-500 text-sm mt-4">{actionData.error}</div>
                  )}
              <div className="mt-12 flex justify-center">
                  <button type='submit' className='bg-primary-700 text-white-100 w-2/4 h-10 rounded'>Regist</button>
              </div>
            </Form>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default LogDialog