export interface GeocodeResult {
  country: string;
  formattedAddress: string;
}

export const getCountryFromCoordinates = async (
  lat: number,
  lng: number
): Promise<GeocodeResult> => {
  const res = await fetch(
    `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
    {
      headers: {
        "User-Agent": "travel-app",
      },
    }
  );

  const data = await res.json();

  return {
    country: data?.address?.country || "Unknown",
    formattedAddress: data?.display_name || "Unknown",
  };
};
