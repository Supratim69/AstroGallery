const NASA_API_URL = "https://api.nasa.gov/planetary/apod";

export interface NasaImage {
    url: string;
    title: string;
    explanation: string;
}

export const fetchNasaImages = async (): Promise<NasaImage[]> => {
    const apiKey = process.env.NEXT_PUBLIC_NASA_API_KEY;
    if (!apiKey) {
        throw new Error(
            "NASA API key is not defined. Set NEXT_PUBLIC_NASA_API_KEY in your .env.local file."
        );
    }

    try {
        const response = await fetch(
            `${NASA_API_URL}?api_key=${apiKey}&count=30`
        );
        if (!response.ok) {
            throw new Error(`Failed to fetch images: ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error("Error fetching NASA images:", error);
        return [];
    }
};
