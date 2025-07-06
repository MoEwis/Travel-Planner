// @ts-nocheck
import NewLocationClient from "@/components/trip-location";

export default async function NewLocation({ params }) {
  const { id: tripId } = params;

  return (
    <div>
      <NewLocationClient tripId={tripId} />
    </div>
  );
}
