import { useEffect } from 'react';
import useWakeUpBackend from '../../hooks/useWakeUpBackend.js';

function ApiWakeUp() {
    const awake = useWakeUpBackend();

    useEffect(() => {
        if (awake) {
            console.log('Backend is wakker – inloggen mogelijk!');
        }
    }, [awake]);

    return <>

    </>;
}

export default ApiWakeUp;
