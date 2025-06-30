import { auth } from "@/auth";
import { getCountryFromCoordinates } from "@/lib/actions/geocode";
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const session = await auth();
    if (!session) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const locations = await prisma.location.findMany({
      where: {
        trip: {
          userId: session.user?.id,
        },
      },
      select: {
        locationTitle: true,
        lat: true,
        lng: true,
        trip: {
          select: {
            title: true,
          },
        },
      },
    });

    const transFormLocations = await Promise.all(
      locations.map(async (loc) => {
        // ✅ تأكد أن الإحداثيات موجودة
        if (!loc.lat || !loc.lng) return null;

        // ✅ جلب معلومات الدولة والعنوان
        const geocodeResult = await getCountryFromCoordinates(loc.lat, loc.lng);

        return {
          name: `${loc.trip.title} - ${geocodeResult.formattedAddress}`,
          lat: loc.lat,
          lng: loc.lng,
          country: geocodeResult.country,
        };
      })
    );

    // ✅ إزالة nulls إذا كانت هناك مواقع فاشلة
    const filteredLocations = transFormLocations.filter(Boolean);

    return NextResponse.json(filteredLocations);
  } catch (error) {
    console.error("API Error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
