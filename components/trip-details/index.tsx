"use client";
import { Location, Trip } from "@/lib/generated/prisma";
import Image from "next/image";
import { Calendar, MapPin, Plus } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import Map from "../map";
import SortableItinerary from "./SortableItinerary";

export type TripWithLocations = Trip & {
  location: Location[];
};

const TripDetailsClient = ({ trip }: { trip: TripWithLocations }) => {
  const [activeTab, setActiveTab] = useState("overview");
  return (
    <div className="container mx-auto px-4 py-8">
      <div className=" relative w-full h-72 md:h-96 overflow-hidden rounded-xl shadow-lg mb-6">
        {trip.imgUrl && (
          <Image
            src={trip.imgUrl}
            alt={trip.title}
            className="object-cover "
            fill
            priority
          />
        )}
      </div>
      <div className="bg-white p-6 rounded-lg flex flex-col md:flex-row justify-between items-start md:items-center shadow-md">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900">
            {trip.title}
          </h1>
          <div className="flex items-center text-gray-500 mt-5 ">
            <Calendar />
            <span className="text-lg ml-2 ">
              {trip.startDate.toLocaleDateString()} -
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-4 md:mt-0">
          <Link href={`/trips/${trip.id}/intinerary/new`}>
            <Button className="cursor-pointer">
              <Plus className="mr-2 !w-5 !h-5" />
              Add Location
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6 ">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="overview" className="text-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="itinerary" className="text-lg">
              Itinerary
            </TabsTrigger>
            <TabsTrigger value="map" className="text-lg">
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <h2 className="text-2xl font-semibold mb-4">Trip Summary</h2>
              <div className="space-y-4">
                <div className="flex items-start">
                  <Calendar className="w-6 h-6 text-gray-500 mr-2" />
                  <div>
                    <p className="text-gray-700 font-medium">Dates</p>
                    <p className="text-sm text-gray-500">
                      {trip.startDate.toLocaleDateString()} -
                      {trip.endDate.toLocaleDateString()}
                      <br />
                      {`${
                        Math.round(
                          trip.endDate.getTime() - trip.startDate.getTime()
                        ) /
                        (1000 * 60 * 60 * 24)
                      } days`}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-gray-500 mr-3" />
                  <div className="">
                    <p>Destinations</p>
                    <p className="">
                      {trip.location.length}
                      <span className="ml-2">
                        {trip.location.length > 1 ? "Locations" : "Location"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="h-72 rounded-lg overflow-hidden shadow">
                <Map intineraies={trip.location} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="itinerary" className="space-y-6">
            <div className="flex justify-between items-center mb-4 ">
              <h2 className="text-2xl font-semibold mb-4">Full Itinerary</h2>
            </div>
            <SortableItinerary locations={trip.location} tripId={trip.id} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TripDetailsClient;
