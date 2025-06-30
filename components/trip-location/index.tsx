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
        await addLocation(formData);
      }}
      className="max-w-md mx-auto mt-10 p-8 bg-gradient-to-br from-blue-50 via-white to-blue-100 rounded-2xl shadow-xl border border-blue-100 space-y-6"
    >
      <input type="hidden" name="tripId" value={tripId} />

      <div>
        <label
          htmlFor="address"
          className="block text-base font-semibold text-blue-700 mb-2"
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
          className="w-full border border-blue-200 px-4 py-3 rounded-lg shadow-sm text-blue-900 bg-white focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400 placeholder:text-blue-300 transition duration-200"
        />
      </div>

      <Button
        type="submit"
        className="w-full py-3 text-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 rounded-xl shadow-lg font-bold tracking-wide transition-all duration-200"
      >
        Add Location
      </Button>
    </form>
  );
}
