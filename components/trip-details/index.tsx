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
    <div className="container mx-auto px-4 py-10 max-w-5xl">
      <div className="relative w-full h-72 md:h-96 overflow-hidden rounded-2xl shadow-xl mb-8 border border-gray-200 bg-gradient-to-br from-blue-50 to-white">
        {trip.imgUrl && (
          <Image
            src={trip.imgUrl}
            alt={trip.title}
            className="object-cover"
            fill
            priority
          />
        )}
      </div>
      <div className="bg-white p-8 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center shadow-lg border border-gray-100 mb-6">
        <div>
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight mb-2">
            {trip.title}
          </h1>
          <div className="flex items-center text-gray-500 mt-3">
            <Calendar className="w-5 h-5" />
            <span className="text-lg ml-2 font-medium">
              {trip.startDate.toLocaleDateString()} -
              {trip.endDate.toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="mt-6 md:mt-0">
          <Link href={`/trips/${trip.id}/intinerary/new`}>
            <Button className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg shadow transition">
              <Plus className="mr-2 w-5 h-5" />
              Add Location
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 mt-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-8 flex gap-4 bg-gray-50 rounded-lg p-2 shadow-inner">
            <TabsTrigger
              value="overview"
              className="text-lg px-4 py-2 rounded-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white transition"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="itinerary"
              className="text-lg px-4 py-2 rounded-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white transition"
            >
              Itinerary
            </TabsTrigger>
            <TabsTrigger
              value="map"
              className="text-lg px-4 py-2 rounded-lg font-semibold data-[state=active]:bg-blue-600 data-[state=active]:text-white transition"
            >
              Map
            </TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-10">
              <div>
                <h2 className="text-2xl font-bold mb-6 text-blue-700">
                  Trip Summary
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Calendar className="w-7 h-7 text-blue-500 mt-1" />
                    <div>
                      <p className="text-gray-700 font-semibold">Dates</p>
                      <p className="text-base text-gray-500">
                        {trip.startDate.toLocaleDateString()} -
                        {trip.endDate.toLocaleDateString()}
                        <br />
                        <span className="font-medium text-blue-600">
                          {`${
                            Math.round(
                              trip.endDate.getTime() - trip.startDate.getTime()
                            ) /
                            (1000 * 60 * 60 * 24)
                          } days`}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <MapPin className="w-7 h-7 text-blue-500 mt-1" />
                    <div>
                      <p className="text-gray-700 font-semibold">
                        Destinations
                      </p>
                      <p className="text-base text-gray-500">
                        <span className="font-bold text-blue-700">
                          {trip.location.length}
                        </span>
                        <span className="ml-2">
                          {trip.location.length > 1 ? "Locations" : "Location"}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="h-72 rounded-xl overflow-hidden shadow border border-gray-200 bg-gray-50">
                <Map intineraies={trip.location} />
              </div>
            </div>
          </TabsContent>
          <TabsContent value="itinerary" className="space-y-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-blue-700">
                Full Itinerary
              </h2>
            </div>
            <SortableItinerary locations={trip.location} tripId={trip.id} />
          </TabsContent>
          <TabsContent value="map" className="space-y-8">
            <div className="h-72 rounded-xl overflow-hidden shadow border border-gray-200 bg-gray-50">
              <Map intineraies={trip.location} />
            </div>
            {trip.location.length === 0 && (
              <div className="text-center p-6 bg-blue-50 rounded-lg mt-4">
                <p className="mb-4 text-blue-700 font-medium">
                  Add more locations to see the map
                </p>
                <Link href={`/trips/${trip.id}/intinerary/new`}>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow transition">
                    <Plus className="w-4 h-4 mr-2" />
                    Add locations
                  </Button>
                </Link>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      <div className="text-center mt-10">
        <Link href={`/trips`}>
          <Button className="cursor-pointer bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg shadow transition font-semibold">
            Back To Trips
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default TripDetailsClient;
