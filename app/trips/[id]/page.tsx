import { auth } from "@/auth";
import AccessCondition from "@/components/access-condition";
import TripDetailsClient from "@/components/trip-details";
import NewLocationForm from "@/components/trip-location";
import { prisma } from "@/lib/prisma";

const TripDetails = async ({ params }: { params: { id: string } }) => {
  const secssion = await auth();

  const { id } = params;
  const trip = await prisma.trip.findFirst({
    where: {
      id,
      userId: secssion?.user?.id,
    },
  });
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
