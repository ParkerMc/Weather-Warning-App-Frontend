export function getStationData(stationId) {
    // TODO perform request
    return {
        type: "STATION_DATA", payload: {
            location: "Richardson, TX",
            temperature: 10,
            low: 2,
            high: 15,
            pressure: 30,
            humidity: 30,
            wind_speed: 6,
            rain_chance: 2
        }
    }
}