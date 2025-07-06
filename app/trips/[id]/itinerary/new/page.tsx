import NewLocationClient from "@/components/trip-location";

interface PageProps {
  params: {
    id: string;
  };
}

const NewLocation = ({ params }: PageProps) => {
  const { id: tripId } = params;

  return (
    <div>
      <NewLocationClient tripId={tripId} />
    </div>
  );
};

export default NewLocation;
