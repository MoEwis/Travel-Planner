"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Location } from "@/lib/generated/prisma";
import { MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import GlobeGL, { GlobeMethods } from "react-globe.gl";
export interface TransFormLoaction {
  lat: number;
  lng: number;
  name: string;
  country: string;
}
const Globe = () => {
  const [loaction, setLoaction] = useState<TransFormLoaction[]>([]);
  const globeRef = useRef<GlobeMethods>(undefined);
  const [isLoading, setIsLoading] = useState(true);
  const [visitedCountries, setVisitedCountries] = useState<Set<string>>(
    new Set()
  );

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await fetch("/api/trips/locations");
        const data = await response.json();
        setLoaction(data);
        const countries = new Set<string>(
          data.map((loc: TransFormLoaction) => loc.country)
        );
        setVisitedCountries(countries);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchLocation();
  }, []);
  useEffect(() => {
    if (globeRef.current) {
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1;
    }
  }, []);
  useEffect(() => {
    console.log("Loaction data =>", loaction);
  }, [loaction]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 ">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-blue-600 mb-8">
            Your Travel Journey
          </h1>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            <div className="lg:col-span-2 bg-white rounded-xl shadow-lg overflow-hidden ">
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-4">
                  See the World...
                </h2>
                <div className="h-[600px] w-full relative">
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center text-4xl text-gray-500">
                      <div className="animate-spin rounded-full h-12 w-12  border-t-gray-300 border-b-gray-900 "></div>
                    </div>
                  ) : (
                    <GlobeGL
                      ref={globeRef}
                      globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
                      bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
                      backgroundColor="rgba(0,0,0,0)"
                      pointColor={() => "#FF5733"}
                      pointLabel="name"
                      pointsData={loaction}
                      pointRadius={0.5}
                      pointAltitude={0.1}
                      pointsMerge={true}
                      width={800}
                      height={600}
                    />
                  )}
                </div>
              </div>
            </div>
            <div className=" lg:col-span-1 bg-white ">
              <Card className="sticky top-8">
                <CardHeader>
                  <CardTitle>Countrise Visited</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 ">
                    <div className="bg-blue-400 p-4 rounded-lg">
                      <p className="text-sm ">
                        You've visited
                        <span className="font-bold">
                          {" "}
                          {visitedCountries.size}{" "}
                        </span>
                        countries
                      </p>
                    </div>
                    <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2 ">
                      {Array.from(visitedCountries).map((country, key) => (
                        <div className="bg-white p-4 rounded-lg" key={key}>
                          <MapPin className="mr-2" />
                          <span className="text-sm ">{country}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Globe;
