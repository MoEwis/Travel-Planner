// "use client";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
// import { createTrip } from "@/lib/actions/create-trip";
// import { cn } from "@/lib/utils";
// import { useState, useTransition } from "react";
// import Image from "next/image";
// import { UploadButton } from "@/lib/uploadthing";

// const NewTrip = () => {
//   const [isPending, startTransition] = useTransition();
//   const [imageUrl, setImageUrl] = useState<string | null>(null);
//   return (
//     <div className="">
//       <CardContent>
//         <form
//           className="space-y-6"
//           action={(formData: FormData) => {
//             if (imageUrl) {
//               formData.append("imageUrl", imageUrl);
//             }
//             startTransition(() => {
//               createTrip(formData);
//             });
//           }}
//         >
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               {" "}
//               Title
//             </label>
//             <input
//               type="text"
//               name="title"
//               placeholder="Japan trip..."
//               className={cn(
//                 "w-full border border-gray-300 px-3 py-2",
//                 "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               )}
//               required
//             />
//           </div>
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-1">
//               Description
//             </label>
//             <textarea
//               name="description"
//               placeholder="Trip description..."
//               className={cn(
//                 "w-full border border-gray-300 px-3 py-2",
//                 "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//               )}
//               required
//             />
//           </div>
//           <div className="grid grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 Start Date
//               </label>
//               <input
//                 type="date"
//                 name="startDate"
//                 className={cn(
//                   "w-full border border-gray-300 px-3 py-2",
//                   "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 )}
//               />
//             </div>
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-1">
//                 {" "}
//                 End Date
//               </label>
//               <input
//                 type="date"
//                 name="endDate"
//                 className={cn(
//                   "w-full border border-gray-300 px-3 py-2",
//                   "rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
//                 )}
//               />
//             </div>
//           </div>
//           <div>
//             <label> Trip Image</label>

//             {imageUrl && (
//               <Image
//                 src={imageUrl}
//                 alt="Trip Preview"
//                 className="w-full mb-4 rounded-md max-h-48 object-cover"
//                 width={300}
//                 height={100}
//               />
//             )}
//             <div>
//               <label htmlFor="">Upload trip image</label>
//               {imageUrl && (
//                 <Image
//                   src={imageUrl}
//                   alt="Trip Preview"
//                   width={300}
//                   height={300}
//                 />
//               )}
//               <UploadButton
//                 className=""
//                 endpoint="imageUploader"
//                 onClientUploadComplete={(res) => {
//                   if (res && res[0].ufsUrl) {
//                     setImageUrl(res[0].ufsUrl);
//                   }
//                 }}
//                 onUploadError={(error: Error) => {
//                   console.error("Upload failed:", error);
//                 }}
//               />
//             </div>
//           </div>
//           <Button type="submit" disabled={isPending} className="w-full">
//             {isPending ? "Creating..." : "Create Trip"}
//           </Button>
//         </form>
//       </CardContent>
//     </div>
//   );
// };

// export default NewTrip;

"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

const NewTrip = () => {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <CardHeader className="pb-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">
          Create New Trip
        </h1>
        <p className="text-center text-gray-600 mt-1">
          Fill in the details for your new adventure
        </p>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-8"
          action={(formData: FormData) => {
            if (imageUrl) {
              formData.append("imageUrl", imageUrl);
            }
            startTransition(() => {
              createTrip(formData);
            });
          }}
        >
          {/* Title Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Trip Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter trip title..."
              className={cn(
                "w-full px-4 py-2.5 text-gray-700",
                "border border-gray-200 rounded-lg",
                "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                "placeholder:text-gray-400",
                "transition duration-200"
              )}
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe your trip plans..."
              className={cn(
                "w-full px-4 py-2.5 text-gray-700",
                "border border-gray-200 rounded-lg",
                "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                "placeholder:text-gray-400",
                "transition duration-200",
                "resize-none"
              )}
              required
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                className={cn(
                  "w-full px-4 py-2.5 text-gray-700",
                  "border border-gray-200 rounded-lg",
                  "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  "transition duration-200"
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-semibold text-gray-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                className={cn(
                  "w-full px-4 py-2.5 text-gray-700",
                  "border border-gray-200 rounded-lg",
                  "focus:ring-2 focus:ring-blue-500 focus:border-blue-500",
                  "transition duration-200"
                )}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="text-sm font-semibold text-gray-700">
              Trip Cover Image
            </label>

            {imageUrl && (
              <div className="relative w-full h-64 rounded-lg overflow-hidden">
                <Image
                  src={imageUrl}
                  alt="Trip Preview"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            )}

            <div className="mt-2">
              <UploadButton
                endpoint="imageUploader"
                onClientUploadComplete={(res) => {
                  if (res && res[0].ufsUrl) {
                    setImageUrl(res[0].ufsUrl);
                  }
                }}
                onUploadError={(error: Error) => {
                  console.error("Upload failed:", error);
                }}
                className="ut-button:bg-blue-600 ut-button:hover:bg-blue-700 ut-button:focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Submit Button */}
          <Button type="submit" disabled={isPending} className="w-full">
            {isPending ? "Creating..." : "Create Trip"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default NewTrip;
