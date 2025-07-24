import { useEffect, useState } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL;

export default function useWakeUpBackend() {
    const [awake, setAwake] = useState(false);

    useEffect(() => {
        async function ping() {
            try {
                await axios.get(`${API_BASE_URL}/test/all`, {
                    timeout: 35000,
                });
            } catch (e) {
                console.warn('Backend reageert niet binnen 35 s:', e.message);
            } finally {
                setAwake(true);
            }
        }
        ping();
    }, []);

    return awake;
}
