import SummaryItem from '../components/SummaryItem';

export default function App() {
  return (
    <div className="flex h-full">
        <div className="w-32 border-r h-full border-white-300">
          aaa
        </div> 
        <div className='w-full p-14 flex flex-col min-h-full'>
          <div className='flex w-full justify-center'>
            <div className='w-1/4 pr-5'>
              <SummaryItem title="care" value={1000} prefix="times" />
            </div>
            <div className='w-1/4 pl-5'>
              <SummaryItem title="Spent with" value={365} prefix="days" />
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
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>
                  <tr className='inline-block h-10 w-full border-b border-l border-r border-white-500 bg-white-100'>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-3/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-4/12 h-10 font-light px-4 py-1'>aa</td>
                    <td className='inline-block w-1/12 h-10'></td>
                    <td className='inline-block w-1/12 h-10'></td>
                  </tr>

                </tbody>
              </table>
            </div>
          </div>
          <div className='flex w-full justify-center mt-14'>
              <button className='bg-primary-700 text-white-100 w-2/4 h-10 rounded'>Add</button>
          </div>
      </div>
    </div>
  );
}