import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_RIJKSMUSEUM_API_BASE;
const API_KEY = import.meta.env.VITE_RIJKSMUSEUM_API_KEY;

const AxiosRijksmuseum = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function fetchArtObjects({
                                          pageSize = 10,
                                          currentPage = 1,
                                          imgOnly = false,
                                          searchTerm = '',
                                      } = {}) {
    try {
        const response = await AxiosRijksmuseum.get('', {
            params: {
                key: API_KEY,
                ps: pageSize,
                p: currentPage,
                imgOnly: imgOnly ? 'True' : 'False',
                q: searchTerm,
            },
        });

        const artObjects = response.data.artObjects || [];
        const count = response.data.count || 0;

        console.log('API-response:', response.data);


        return { artObjects, count };
    } catch (err) {
        console.error('Fout bij ophalen van Rijksmuseum-collectie:', err);
        throw err;
    }
}

export async function fetchArtObjectById(objectNumber) {
    try {
        const response = await AxiosRijksmuseum.get(`/${objectNumber}`, {
            params: {
                key: API_KEY,
            },
        });

        return response.data.artObject;
    } catch (err) {
        console.error(`Fout bij ophalen van object ${objectNumber}:`, err);
        throw err;
    }
}


