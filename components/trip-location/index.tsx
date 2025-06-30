"use client";

import { useState } from "react";
import { addLocation } from "@/lib/actions/add-location";
import { Button } from "@/components/ui/button";

type Props = {
  tripId: string;
};

export default function NewLocationForm({ tripId }: Props) {
  const [address, setAddress] = useState("");

  return (
    <form
      action={async (formData) => {
        // بشكل مباشر يتم تنفيذ Server Action addLocation
        await addLocation(formData);
      }}
      className="max-w-md mx-auto p-6 bg-white rounded shadow space-y-4"
    >
      {/* إخفاء tripId داخل formData */}
      <input type="hidden" name="tripId" value={tripId} />

      <div>
        <label
          htmlFor="address"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Address
        </label>
        <input
          type="text"
          name="address"
          id="address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          placeholder="e.g. Egypt - Menoufia"
          required
          className="w-full border border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <Button type="submit" className="w-full">
        Add Location
      </Button>
    </form>
  );
}
