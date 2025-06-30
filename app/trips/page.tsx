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
    <div className="container mx-auto px-4 py-12 max-w-6xl space-y-10">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-blue-800 drop-shadow-sm">
          Dashboard
        </h1>
        <Link href="/trips/new">
          <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow transition font-semibold">
            New Trip
          </Button>
        </Link>
      </div>
      {/* components  */}
      <Card className="bg-gradient-to-br from-blue-50 to-white border-0 shadow-lg mb-8">
        <CardHeader className="text-2xl font-bold text-blue-700">
          Welcome Back{" "}
          <span className="text-blue-900">{secssion.user?.name}</span>
        </CardHeader>
        <CardContent>
          <p className="text-lg text-gray-700">
            {trip.length === 0
              ? "You have no trips yet."
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
        <h2 className="text-2xl font-bold mb-8 text-blue-700">
          Your Recent Trips
        </h2>
        {trip.length === 0 ? (
          <Card className="bg-blue-50 border-0 shadow-md">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <h3 className="text-2xl font-semibold mb-2 text-blue-800">
                No Trips Yet.
              </h3>
              <p className="text-center mb-6 max-w-md text-gray-600">
                Start planning your adventure by creating your first trip.
              </p>
              <Link href="/trips/new">
                <Button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition font-semibold">
                  Create Trip
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortTrips.slice(0, 3).map((trip) => (
              <Link href={`/trips/${trip.id}`} key={trip.id}>
                <Card className="w-full hover:shadow-xl transition-shadow border-0 bg-white rounded-xl">
                  <CardHeader>
                    <CardTitle className="line-clamp-1 text-lg font-bold text-blue-800">
                      {trip.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="line-clamp-2 text-base mb-3 text-gray-700">
                      {trip.description}
                    </p>
                    <div className="flex flex-col text-sm text-gray-500">
                      <span>
                        <span className="font-semibold text-blue-600">
                          Start:
                        </span>{" "}
                        {new Date(trip.startDate).toLocaleDateString() || ""}
                      </span>
                      <span>
                        <span className="font-semibold text-blue-600">
                          End:
                        </span>{" "}
                        {new Date(trip.endDate).toLocaleDateString() || ""}
                      </span>
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
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-100 to-white">
        <h1 className="text-3xl font-extrabold text-blue-700 shadow-lg px-8 py-6 rounded-xl bg-white">
          Please login to view your trips
        </h1>
      </div>
    </>
  );
};

export default Trips;
