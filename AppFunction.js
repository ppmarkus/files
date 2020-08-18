import React, { useState, useEffect } from 'react'
import { yellow, grey } from '@material-ui/core/colors';
import HighlightIcon from '@material-ui/icons/Highlight';


const initialLocationState = {
    latitude: null,
    longitude: null,
    speed: null
}

const App = () => {

    const [count, setCount] = useState(0)
    const [isOn, setIsOn] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: null, y: null })
    const [status, setStatus] = useState(navigator.onLine)
    const [{latitude, longitude, speed}, setLocation] = useState(initialLocationState)

    let mounted = true;

    useEffect(() => {
        document.title = `you have clicked ${count} times `
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('online', handleOnline);
        window.addEventListener('offline', handleOffline);
        const watchId = navigator.geolocation.getCurrentPosition(handleGeolocation)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('online', handleOnline);
            window.removeEventListener('offline', handleOffline);
            navigator.geolocation.clearWatch(watchId);
            mounted = false;
        }
    }, [count]);

    const handleGeolocation = event => {
        if (mounted) {
            setLocation({
                latitude: event.coords.latitude,
                longitude: event.coords.longitude,
                speed: event.coords.speed,
            })
        }
    }

    const handleOnline = () => {
        setStatus(true)
    }

    const handleOffline = () => {
        setStatus(false)
    }

    const handleMouseMove = event => {
        setMousePosition({
            x: event.pageX,
            y: event.pageY
        })
    }

    const incrementCount = () => {
        setCount(prevCount => prevCount + 1)
    }

    const toggleLight = () => {
        console.log("toggle light " + isOn)
        setIsOn(prevState => (!prevState))
    }

    return (
        <>
            <h2>Counter [function]</h2>
            <button onClick={incrementCount}>I was clicked {count} times (in function component) </button>

            <h2>Toggle Light</h2>
            <HighlightIcon

                style={{

                    color: isOn ? yellow[500] : grey[500],
                    height: '50px',
                    width: '50px',
                }}
                alt="Lightbulb"
                onClick={toggleLight}
            />
            <h2>Mouse Position</h2>
            {JSON.stringify(mousePosition, null, 2)}
            <br />
            <h2>Network Status</h2>
            <p>You are <strong>{status ? "online" : "offline"}</strong></p>
            <br />
            <h2>Geolocation</h2>
            <p>Latitude is {latitude}</p>
            <p>Longgitude is {longitude}</p>
            <p>Your speed is {speed ? speed : "0"}</p>
        </>
    )
}

export default App;