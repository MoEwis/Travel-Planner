import { auth } from "@/auth";
import AccessCondition from "@/components/access-condition";
import TripForm from "@/components/react-hook-form/TripForm";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const NewTrip = async () => {
  const session = await auth();
  if (!session)
    return (
      <AccessCondition
        title="Unauthorized"
        subTitle="You need to be logged in to view this page."
      ></AccessCondition>
    );

  return (
    <div className="max-w-lg mx-auto mt-10">
      <Card>
        <CardContent>
          <TripForm />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewTrip;
