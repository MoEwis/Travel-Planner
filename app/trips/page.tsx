import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { prisma } from "@/lib/prisma";
import Link from "next/link";

const Trips = async () => {
  const secssion = await auth();

  const trip = await prisma.trip.findMany({
    where: {
      userId: secssion?.user?.id,
    },
  });

  const sortTrips = [...trip].sort((a, b) => {
    return new Date(b.startDate).getTime() - new Date(a.startDate).getTime();
  });

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const upcomingTrips = sortTrips.filter((trip) => {
    return new Date(trip.startDate) >= today;
  });

  return secssion ? (
    <div className="container space-y-6 mx-auto px-4 py-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Dashbord</h1>
        <Link href="/trips/new">
          <Button>New Trip</Button>
        </Link>
      </div>
      {/* components  */}
      <Card>
        <CardHeader>Welcome Back {secssion.user?.name}</CardHeader>
        <CardContent>
          <p>
            {trip.length === 0
              ? " You have no trips yet."
              : `You have ${trip.length} ${
                  trip.length === 1 ? "trip" : "trips"
                } planned. ${
                  upcomingTrips.length > 0
                    ? `You have ${upcomingTrips.length} upcoming trips.`
                    : ""
                }`}
          </p>
        </CardContent>
      </Card>
      {/* components  */}
      <div>
        <h2 className="text-xl font-semibold mb-6">Your Recent Trips</h2>
        {trip.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-8">
              <h3 className="text-xl font-medium mb-2">No Trips Yet.</h3>
              <p className="text-center mb-4 max-w-md">
                Start Planning Your Adventure by Creating You First Trip.
              </p>
              <Link href="/trips/new">
                <Button>Create Trip</Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortTrips.slice(0, 3).map((trip) => (
              <Link href={`/trips/${trip.id}`} key={trip.id}>
                <Card className="w-full hover:shadow-md transition-shadow">
                  <CardHeader>
                    <CardTitle className="line-clamp-1">{trip.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-sm mb-2">
                      {trip.description}
                    </p>
                    <div className="text-sm text-gray-500 mb-2">
                      {new Date(trip.startDate).toLocaleDateString() || ""}
                      {new Date(trip.endDate).toLocaleDateString() || ""}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  ) : (
    <>
      <div className="flex h-screen items-center justify-center">
        <h1 className="text-2xl font-bold">Please login to view your trips</h1>
      </div>
    </>
  );
};

export default Trips;
