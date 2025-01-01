import { useEffect, useState } from 'react';
import SummaryItem from '../components/SummaryItem';
import LogDialog from '~/components/LogDialog';
import { useLoaderData,useFetcher } from "@remix-run/react";
import { prisma } from "../../prisma/prisma"
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { MdContentCopy } from "react-icons/md";
import { withAuth,returnUser} from '~/utils/session.server';



// 型定義
export type Log = {
  id: string;
  plantId: string;
  careDate: Date;
  care:string;
  detail:string
  createdAt: string;
  updatedAt: string;
};

type LoaderData = {
  plants: { id: string; name: string; createdAt: string }[];
  cares: { id: string; name: string; createdAt: string }[];
  logs: Log[];
};

type ActionData = {
  logs: Log[];
};


// Loader関数
export const loader = withAuth(async ({ request }: { request: Request }) => {
    const userId = await returnUser(request);
  
    // ユーザーIDに紐づくPlantデータを取得
    const plants = await prisma.plant.findMany({
        where: { userId },
        orderBy: { createdAt: "desc" }, // 作成日時で並び替え
      });
    const cares = await prisma.care.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // 作成日時で並び替え
    });

    const logs = await prisma.log.findMany({
      where: { userId: userId },
      orderBy: { careDate: "desc" },
    });

    return {plants,cares,logs};
});

export const action = withAuth(async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const plantId = formData.get("plantId") as string;
  const actionType = formData.get("actionType") as string
  const userId = await returnUser(request);
  try{
    //削除操作
    if(actionType === "delete") {
      const logId = formData.get("logId") as string;
      if (!logId) {
        return new Response(
          JSON.stringify({ error: "Log ID is required for deletion" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const deleteLog = await prisma.log.delete({
        where: { userId:userId,id: logId ,plantId:plantId},
      });

      return new Response(
        JSON.stringify({ message: "Log deleted successfully",deleteLog }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }
      // 入力チェック
      const care = formData.get("care") as string;
      const careDate = formData.get("careDate") as string;
      const detail = formData.get("detail") as string;

      if (!care || care === "") {
        return new Response(
          JSON.stringify({
            error: "Care is required",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if (!careDate || careDate === "") {
        return new Response(
          JSON.stringify({
            error: "CareDate is required",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      if(detail.length > 100){
        return new Response(
          JSON.stringify({
            error: "Detail must be less than 100 characters",
          }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      
      //編集操作
      if(actionType === "edit") {
        const logId = formData.get("logId") as string;
        if (!logId) {
          return new Response(
            JSON.stringify({ error: "Log ID is required for editing" }),
            { status: 400, headers: { "Content-Type": "application/json" } }
          );
        }
        const updateCare = await prisma.log.update({
          where: { id: logId ,plantId:plantId,userId:userId},
          data: { care, careDate: new Date(careDate), detail },
        });

        return new Response(
          JSON.stringify({ message: "Log updated successfully", updateCare }),
          { status: 201, headers: { "Content-Type": "application/json" } }
        );
      }

      // 新規作成操作
      if (actionType === "create") {

        const createCare = await prisma.log.create({
          data: {
            userId: userId, // 適切なユーザーIDを設定
            plantId: plantId,
            care,
            careDate: new Date(careDate),
            detail,
          },
        });

        return new Response(
          JSON.stringify({ message: "Log created successfully", createCare }),
          { status: 201, headers: { "Content-Type": "application/json" } }
        );
      }
    return new Response(
      JSON.stringify({ error: "Invalid action type" }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Action error:", error);
    return new Response(
      JSON.stringify({ error: "An unexpected error occurred" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});


export default function App() {
  const[modalOpen, SetModalOpen] = useState(false);
  const {plants,cares,logs} = useLoaderData<LoaderData>();
  const [selectedPlant, setSelectedPlant] = useState(plants[0]?.id || "");
  const[targetAction, setTargetAction] = useState<"create" | "edit">("create");
  const [targetLog, setLogData] = useState<Log>(
    { id: "", plantId: selectedPlant, careDate: new Date(), care: cares.length > 0 ? cares[0].name : "", detail: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() }
  );

  const fetcher = useFetcher<ActionData>();
  const plantLogs = logs.find((log) => log.plantId === selectedPlant) ? logs.filter((log) => log.plantId === selectedPlant) : [];
  const count = plantLogs.length;
  const minDate = plantLogs.reduce((min, log) => (log.careDate < min ? log.careDate : min), new Date(plantLogs[0]?.careDate));
  const nowDate = new Date();
  let spent = Math.floor((nowDate.getTime() - minDate.getTime()) / 86400000);
  spent = isNaN(spent) ? 0 : spent;
  const options = cares.map((care) => ({ value: care.name, name: care.name }));

  useEffect(() => {
    fetcher.submit( { plantId:selectedPlant, actionType: "get" }, { method: "post", action: "" });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlant]);
  
  const handlePlantChange = (plantId: string) => {
    setSelectedPlant(plantId);
  };

  const handleDelete = (id: string) => {
    fetcher.submit(
      { plantId:selectedPlant,logId:id, actionType: "delete" },
      {  
        method: "post",
        action: "",
      });
  };

  const handleEdit = (log: Log) => {
    setLogData(log);
    setTargetAction("edit");
    SetModalOpen(true);
  };

  const handleCopy = (log: Log) => {
    const newLog:Log = {...log,id:"",careDate:new Date()};
    setLogData(newLog);
    setTargetAction("create");
    SetModalOpen(true);
  }

  const handleCreate = () => {
    setLogData({ id: "", plantId: selectedPlant, careDate: new Date(), care: cares.length > 0 ? cares[0].name:"" , detail: "", createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    setTargetAction("create");
    SetModalOpen(true);
  }

  return (
    <div className="flex h-full">
        <LogDialog isOpen={modalOpen} handleClose={SetModalOpen} targetAction={targetAction} targetId={selectedPlant} selectOptions={options} targetLog={targetLog!}/>
        <div className="w-64 border-r p-6 h-full border-white-300 text-white-500">
          <ul>
          {plants.map((plant) => (
          <li className={`border-l-2 ${plant.id === selectedPlant ? "text-primary-400" : ""} px-4 py-2 `} key={plant.id}>
          <button onClick={() => handlePlantChange(plant.id)}>
            {plant.name}
          </button>
          </li>
        ))}
          </ul>
        </div> 
        <div className='w-full p-14 flex flex-col min-h-full'>
          <div className='flex w-full justify-center'>
            <div className='w-4/12 pr-5'>
              <SummaryItem title="Care" value={count} prefix="times" />
            </div>
            <div className='w-4/12 pl-5'>
              <SummaryItem title="Spent with" value={spent} prefix="days" />
            </div>
          </div>
          <div className='flex w-full justify-center mt-20 grow'>
            <div className='w-8/12'>
              <table className='table-fixed w-full h-full text-white-500 '>
                <thead className='block'>
                  <tr className='border-b h-10 inline-block w-full'>
                    <th className='inline-block h-10  font-light w-3/12 p-1 px-4'>date</th>
                    <th className='inline-block h-10  font-light w-3/12 p-1 px-4'>care</th>
                    <th className='inline-block h-10  font-light w-3/12 p-1 px-4'>detail</th>
                    <th className='inline-block h-10  font-light w-1/12 p-1 px-4'></th>
                    <th className='inline-block h-10  font-light w-1/12 p-1 px-4'></th>
                    <th className='inline-block h-10  font-light w-1/12 p-1 px-4'></th>
                  </tr>
                </thead>
                <tbody className='block h-full overflow-auto'>
                  {plantLogs.map((log) => (
                    <tr key={log.id} className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                      <td className='inline-block h-10 w-3/12 font-light px-4 py-1 text-center content-center'>{new Date(log.careDate).toLocaleDateString()}</td>
                      <td className='inline-block h-10 w-3/12 font-light px-4 py-1 text-left content-center'>{log.care}</td>
                      <td className='inline-block h-10 w-3/12 font-light px-4 py-1 text-left content-center'>{log.detail}</td>
                      <td className='inline-block h-10 w-1/12 text-2xl text-center content-end'><button onClick={() => handleEdit(log)}><CiEdit /></button></td>
                      <td className='inline-block h-10 w-1/12 text-2xl text-center content-end'><button onClick={() => handleCopy(log)}><MdContentCopy /></button></td>
                      <td className='inline-block h-10 w-1/12 text-2xl text-center content-end'><button onClick={() => handleDelete(log.id)}><RiDeleteBin5Line /></button></td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
          <div className='flex w-full justify-center mt-14'>
              <button className='bg-primary-700 disabled:bg-white-500 text-white-100 w-8/12 h-10 rounded' disabled={!selectedPlant}onClick={() => handleCreate()}>Add</button>
          </div>
      </div>
    </div>
  );
}