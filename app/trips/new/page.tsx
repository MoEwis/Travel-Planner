// "use client";

// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { cn } from "@/lib/utils";

// const NewTrip = () => {
//   return (
//     <div className="max-w-lg mx-auto mt-10">
//       <Card>
//         <CardHeader>New Trip</CardHeader>
//         <CardContent>
//           <form action="" className="space-y-6 ">
//             <div>
//               <label
//                 htmlFor=""
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Title
//               </label>
//               <input
//                 type="text"
//                 name="title"
//                 placeholder="Jpan Trip"
//                 className={cn(
//                   "w-full border border-gray-300 px-3 py-2 ",
//                   "rounded-md focus:outline-none focus:ring-2 focus:border-gray-500-500 "
//                 )}
//                 required
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor=""
//                 className="block text-sm font-medium text-gray-700 mb-1"
//               >
//                 Description
//               </label>
//               <textarea
//                 name="description"
//                 placeholder="Trip Description"
//                 className={cn(
//                   "w-full border border-gray-300 px-3 py-2 ",
//                   "rounded-md focus:outline-none focus:ring-2 focus:border-gray-500-500 "
//                 )}
//               />
//             </div>
//             <div>
//               <div>
//                 <label
//                   htmlFor=""
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   Start Date
//                 </label>
//                 <input
//                   type="date"
//                   name="StartDate"
//                   placeholder="Jpan Trip"
//                   className={cn(
//                     "w-full border border-gray-300 px-3 py-2 ",
//                     "rounded-md focus:outline-none focus:ring-2 focus:border-gray-500-500 "
//                   )}
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor=""
//                   className="block text-sm font-medium text-gray-700 mb-1"
//                 >
//                   End Date
//                 </label>
//                 <input
//                   type="date"
//                   name="EndDate"
//                   placeholder="Jpan Trip"
//                   className={cn(
//                     "w-full border border-gray-300 px-3 py-2 ",
//                     "rounded-md focus:outline-none focus:ring-2 focus:border-gray-500-500 "
//                   )}
//                 />
//               </div>
//             </div>
//           </form>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// export default NewTrip;

import TripForm from "@/components/react-hook-form/TripForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NewTrip = () => {
  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardContent>
          <TripForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTrip;
