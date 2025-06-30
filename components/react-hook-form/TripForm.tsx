"use client";
import { Button } from "@/components/ui/button";
import { CardContent, CardHeader } from "@/components/ui/card";
import { createTrip } from "@/lib/actions/create-trip";
import { cn } from "@/lib/utils";
import { useState, useTransition } from "react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";

const NewTrip = () => {
  const [isPending, startTransition] = useTransition();
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  return (
    <div className="max-w-2xl mx-auto p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-2xl border border-blue-100">
      <CardHeader className="pb-6 border-b border-blue-100">
        <h1 className="text-3xl font-extrabold text-center text-blue-800 tracking-tight">
          Create New Trip
        </h1>
        <p className="text-center text-blue-600 mt-2 text-base">
          Fill in the details for your new adventure
        </p>
      </CardHeader>
      <CardContent>
        <form
          className="space-y-10 mt-6"
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
            <label className="text-base font-semibold text-blue-700">
              Trip Title
            </label>
            <input
              type="text"
              name="title"
              placeholder="Enter trip title..."
              className={cn(
                "w-full px-4 py-3 text-blue-900 bg-white",
                "border border-blue-200 rounded-lg shadow-sm",
                "focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
                "placeholder:text-blue-300",
                "transition duration-200"
              )}
              required
            />
          </div>

          {/* Description Field */}
          <div className="space-y-2">
            <label className="text-base font-semibold text-blue-700">
              Description
            </label>
            <textarea
              name="description"
              rows={4}
              placeholder="Describe your trip plans..."
              className={cn(
                "w-full px-4 py-3 text-blue-900 bg-white",
                "border border-blue-200 rounded-lg shadow-sm",
                "focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
                "placeholder:text-blue-300",
                "transition duration-200",
                "resize-none"
              )}
              required
            />
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-2">
              <label className="text-base font-semibold text-blue-700">
                Start Date
              </label>
              <input
                type="date"
                name="startDate"
                className={cn(
                  "w-full px-4 py-3 text-blue-900 bg-white",
                  "border border-blue-200 rounded-lg shadow-sm",
                  "focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
                  "transition duration-200"
                )}
              />
            </div>
            <div className="space-y-2">
              <label className="text-base font-semibold text-blue-700">
                End Date
              </label>
              <input
                type="date"
                name="endDate"
                className={cn(
                  "w-full px-4 py-3 text-blue-900 bg-white",
                  "border border-blue-200 rounded-lg shadow-sm",
                  "focus:ring-2 focus:ring-blue-400 focus:border-blue-400",
                  "transition duration-200"
                )}
              />
            </div>
          </div>

          {/* Image Upload Section */}
          <div className="space-y-4">
            <label className="text-base font-semibold text-blue-700">
              Trip Cover Image
            </label>

            {imageUrl && (
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-blue-200 shadow">
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
          <Button
            type="submit"
            disabled={isPending}
            className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-xl shadow-lg font-bold tracking-wide transition-all duration-200"
          >
            {isPending ? "Creating..." : "Create Trip"}
          </Button>
        </form>
      </CardContent>
    </div>
  );
};

export default NewTrip;
