import { auth } from "@/auth";
import AccessCondition from "@/components/access-condition";
import TripDetailsClient, {
  TripWithLocations,
} from "@/components/trip-details";
import { prisma } from "@/lib/prisma";
interface PageProps {
  params: {
    id: string;
  };
}
const TripDetails = async ({ params }: PageProps) => {
  const secssion = await auth();

  const { id } = params;
  const trip = await prisma.trip.findFirst({
    where: {
      id,
      userId: secssion?.user?.id,
    },
    include: {
      location: true,
    },
  });
  console.log(trip);

  if (!secssion) {
    return (
      <AccessCondition
        title="Unauthorized"
        subTitle="You need to be logged in to view this page."
      />
    );
  }

  if (trip?.userId !== secssion?.user?.id) {
    return (
      <AccessCondition
        title="Unauthorized"
        subTitle="You do not have permission to view this trip."
      />
    );
  }
  if (!trip) {
    return (
      <AccessCondition
        title="Trip Not Found"
        subTitle="The trip you are looking for does not exist."
      />
    );
  }
  return (
    <div>
      <TripDetailsClient trip={trip} />
    </div>
  );
};

export default TripDetails;
