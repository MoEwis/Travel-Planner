import { auth } from "@/auth";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Trips = async () => {
  const secssion = await auth();
  return secssion ? (
    <div className="container space-y-6 mx-auto px-4 py-8">
      <div>
        <h1>Dashbord</h1>
        <Link href="/trips/new">
          <Button>New Trip</Button>
        </Link>
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
