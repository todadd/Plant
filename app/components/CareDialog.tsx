import { Dialog, DialogPanel, DialogTitle,DialogBackdrop } from '@headlessui/react'
import React ,{ Dispatch, SetStateAction }  from 'react'
import { IoCloseOutline } from "react-icons/io5";
import Select from './Select';
import { Label } from './Label';
import { Textbox } from './Textbox';
import Datepicker from './DatepPicker';


interface CareDialogProps {

  isOpen: boolean;

  handleClose: Dispatch<SetStateAction<boolean>>;

}
const CareDialog: React.FC<CareDialogProps> = ({ isOpen, handleClose }) => {
  function close() {
    handleClose(false)
  }

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

            <div className='mt-5'>
                <Label text='Care' className="text-white-500 text-s"></Label>
                <Datepicker></Datepicker>
            </div>
            <div className='mt-5'>
                <Label text='Care' className="text-white-500 text-s"></Label>
                <Select></Select>
            </div>
            <div className='mt-5'>
                <Label text='Detail' className="text-white-500 text-s"></Label>
                <Textbox></Textbox>
            </div>
            <div className="mt-12 flex justify-center">
                <button className='bg-primary-700 text-white-100 w-2/4 h-10 rounded' onClick={() =>  handleClose(false)}>Regist</button>
            </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  )
}

export default CareDialog