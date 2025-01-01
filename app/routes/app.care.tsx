import { useState } from 'react';           
import CareDialog from '~/components/CareDialog';
import { prisma } from "../../prisma/prisma"
import { useLoaderData,useFetcher } from "@remix-run/react";
import { RiDeleteBin5Line } from "react-icons/ri";
import { CiEdit } from "react-icons/ci";
import { withAuth ,returnUser} from '~/utils/session.server';


type LoaderData = {
  cares: { id: string; name: string; createdAt: Date }[];
};


// Loader関数
export const loader = withAuth(async ({ request }: { request: Request }) => {
  const userId = await returnUser(request);
  // ユーザーIDに紐づくPlantデータを取得

 const cares = await prisma.care.findMany({
    where: { userId:userId },
    orderBy: { createdAt: "desc" }, // 作成日時で並び替え
  });

return {cares};
});

export const action = withAuth(async ({ request }: { request: Request }) => {
  const formData = await request.formData();
  const actionType = formData.get("actionType") as string;
  const userId = await returnUser(request);

  try {
    //削除操作
    if (actionType === "delete") {
      // 削除操作
      const careId = formData.get("careId") as string;
      if (!careId) {
        return new Response(
          JSON.stringify({ error: "Care ID is required for deletion" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const deleteCare = await prisma.care.delete({
        where: { id: careId ,userId:userId},
      });

      return new Response(
        JSON.stringify({ message: "Care deleted successfully", deleteCare }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );
    }

    // 入力チェック
    const name = formData.get("name") as string;
    if (!name || name.length < 1 || name.length > 100) {
      return new Response(
        JSON.stringify({
          error: "Name must be between 1 and 100 characters",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }
    //編集操作
    if(actionType === "edit") {
      const careId = formData.get("id") as string;
      if (!careId) {
        return new Response(
          JSON.stringify({ error: "Care ID is required for editing" }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const updateCare = await prisma.care.update({
        where: { id: careId,userId:userId },  
        data: { name },
      });

      return new Response(
        JSON.stringify({ message: "Care created successfully", updateCare }),
        { status: 201, headers: { "Content-Type": "application/json" } }
      );
    }
    // 新規作成操作
    if (actionType === "create") {

      const createCare = await prisma.care.create({
        data: {
          userId: userId,// 適切なユーザーIDを設定
          name,
        },
      });

      return new Response(
        JSON.stringify({ message: "Care created successfully", createCare }),
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
  const[targetId, setTargetId] = useState("");
  const[targetAction, setTargetAction] = useState<"create" | "edit">("create");

  const {cares} = useLoaderData<LoaderData>();
  const fetcher = useFetcher();

  const handleDelete = (careId: string) => {
    fetcher.submit(
      { careId, actionType: "delete" },
      {  
        method: "post",
        action: "/app/care",
      });
  };

  const handleEdit = (careId: string) => {
    setTargetId(careId);
    setTargetAction("edit");
    SetModalOpen(true);
  };

  const handleCreate = () => {
    setTargetId("");
    setTargetAction("create");
    SetModalOpen(true);
  }

  return (
    <div className="flex h-full">
        <CareDialog isOpen={modalOpen} handleClose={SetModalOpen} targetId={targetId} targetAction={targetAction}/>
        <div className='w-full p-14 flex flex-col min-h-full'>
          <div className='flex w-full justify-center'>
          </div>
          <div className='flex w-full justify-center mt-20 grow'>
            <div className='w-4/12'>
              <table className='table-fixed w-full h-full text-white-500 '>
                <thead className='block'>
                  <tr className='border-b h-10 inline-block w-full'>
                  <th className='inline-block h-10  font-light w-5/12 p-1'>name</th>
                    <th className='inline-block h-10  font-light w-3/12 p-1'>date</th>
                    <th className='inline-block h-10  font-light w-2/12 p-1'></th>
                    <th className='inline-block h-10  font-light w-2/12 p-1'></th>
                  </tr>
                </thead>
                <tbody className='block h-full overflow-auto'>
                  {cares.map((care) => (
                    <tr className='inline-block h-10 w-full border-b border-l border-r bordeßr-white-500 bg-white-100' key={care.id}>
                      <td className='inline-block w-5/12 h-10 font-light px-4 py-1 text-left content-center'>{care.name}</td>
                      <td className='inline-block w-3/12 h-10 font-light px-4 py-1 text-center content-center'>{care.createdAt.toLocaleDateString()}</td>
                      <td className='inline-block w-2/12 h-10 text-2xl text-center content-end'><button onClick={() => handleEdit(care.id)}><CiEdit /></button></td>
                      <td className='inline-block w-2/12 h-10 text-2xl text-center content-end'><button onClick={() => handleDelete(care.id)}><RiDeleteBin5Line /></button></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <div className='flex w-full justify-center mt-14'>
              <button className='bg-primary-700 text-white-100 w-4/12 h-10 rounded' onClick={() => handleCreate()}>Add</button>
          </div>
      </div>
    </div>
  );
}