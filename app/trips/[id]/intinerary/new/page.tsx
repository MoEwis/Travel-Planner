import NewLocationClient from "@/components/trip-location";

interface PageProps {
  params: {
    id: string;
  };
}
const NewLocation = async ({ params }: PageProps) => {
  const { id: tripId } = await params;
  return (
    <div>
      <NewLocationClient tripId={tripId} />
    </div>
  );
};

export default NewLocation;
