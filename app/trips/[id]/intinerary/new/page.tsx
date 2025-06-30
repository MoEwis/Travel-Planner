import NewLocationClient from "@/components/trip-location";

const NewLocation = async ({ params }: { params: { id: string } }) => {
  const { id: tripId } = await params;
  return (
    <div>
      <NewLocationClient tripId={tripId} />
    </div>
  );
};

export default NewLocation;
