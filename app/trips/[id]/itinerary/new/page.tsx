import NewLocationClient from "@/components/trip-location";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function NewLocation({ params }: PageProps) {
  const { id: tripId } = params;

  return (
    <div>
      <NewLocationClient tripId={tripId} />
    </div>
  );
}
