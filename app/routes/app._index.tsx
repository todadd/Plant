import { useEffect, useState } from 'react';
import SummaryItem from '../components/SummaryItem';
import CareDialog from '~/components/CareDialog';
import { useLoaderData,useFetcher } from "@remix-run/react";
import { prisma } from "../../prisma/prisma"

// 型定義
type Log = {
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
};

type ActionData = {
  logs: Log[];
};


// Loader関数
export const loader = async ({ params }: { params: { userId: string } }) => {
    const { userId } = params;
    // ユーザーIDに紐づくPlantデータを取得

   const plants = await prisma.plant.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }, // 作成日時で並び替え
    });

  return {plants};
};

export const action = async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const plantId = formData.get("plantId") as string;

  const logs = await prisma.log.findMany({
    where: { plantId },
    orderBy: { careDate: "desc" },
  });

  return { logs };
};


export default function App() {
  const[modalOpen, SetModalOpen] = useState(false);
  const { plants} = useLoaderData<LoaderData>();
  const fetcher = useFetcher<ActionData>();
  const [selectedPlant, setSelectedPlant] = useState(plants[0]?.id || "");

  const logs = fetcher.data?.logs || [];
  const count = logs.length;
  const minDate = logs.reduce((min, log) => (log.careDate < min ? log.careDate : min), logs[0]?.careDate);
  const nowDate = new Date();
  const spent = minDate? Math.floor((nowDate.getTime() - minDate.getTime()) / 86400000): 0;

  useEffect(() => {
    const plantId = selectedPlant;
    fetcher.submit({ plantId }, { method: "post" });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPlant]);
  
  const handlePlantChange = (plantId: string) => {
    setSelectedPlant(plantId);
    
  };


  return (
    <div className="flex h-full">
        <CareDialog isOpen={modalOpen} handleClose={SetModalOpen} />
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
            <div className='w-1/4 pr-5'>
              <SummaryItem title="Care" value={count} prefix="times" />
            </div>
            <div className='w-1/4 pl-5'>
              <SummaryItem title="Spent with" value={spent} prefix="days" />
            </div>
          </div>
          <div className='flex w-full justify-center mt-20 grow'>
            <div className='w-2/4'>
              <table className='table-fixed w-full h-full text-white-500 '>
                <thead className='block'>
                  <tr className='border-b h-10 inline-block w-full'>
                    <th className='inline-block h-10  font-light w-3/12 p-1'>date</th>
                    <th className='inline-block h-10  font-light w-3/12 p-1'>care</th>
                    <th className='inline-block h-10  font-light w-4/12 p-1'>detail</th>
                    <th className='inline-block h-10  font-light w-1/12 p-1'></th>
                    <th className='inline-block h-10  font-light w-1/12 p-1'></th>
                  </tr>
                </thead>
                <tbody className='block h-full overflow-auto'>
                  {logs.map((log) => (
                    <tr key={log.id} className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                      <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>{log.careDate.toLocaleDateString()}</td>
                      <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>{log.care}</td>
                      <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>{log.detail}</td>
                      <td className='inline-block w-1/12 h-10'></td>
                      <td className='inline-block w-1/12 h-10'></td>
                    </tr>
                  ))}

                </tbody>
              </table>
            </div>
          </div>
          <div className='flex w-full justify-center mt-14'>
              <button className='bg-primary-700 text-white-100 w-2/4 h-10 rounded' onClick={() => SetModalOpen(true)}>Add</button>
          </div>
      </div>
    </div>
  );
}