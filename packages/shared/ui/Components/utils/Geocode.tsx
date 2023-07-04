import axios from "axios";

export async function getCityAndState(latitude: any, longitude: any) {
  try {
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`
    );

    const { results } = response.data;
    // console.log(response.data);

    if (results.length > 0) {
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        const { address_components } = result;

        for (let j = 0; j < address_components.length; j++) {
          const addressComponent = address_components[j];
          const { types, long_name } = addressComponent;

          if (types.includes("locality")) {
            const city = long_name;
            const state = address_components[j + 1].long_name;
            const country = address_components[j + 3].long_name;
            return { city, state, country };
          }
        }
      }
    }

    return null; // If no city and state found
  } catch (error) {
    console.error("Error fetching geocode:", error);
    return null;
  }
}
