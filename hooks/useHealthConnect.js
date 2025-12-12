import { useState, useEffect } from 'react';
import {
    initialize,
    requestPermission,
    readRecords,
    getSdkStatus,
    openHealthConnectSettings,
    SdkAvailabilityStatus,
} from 'react-native-health-connect';

const useHealthConnect = () => {
    const [isAvailable, setIsAvailable] = useState(false);
    const [isInitialized, setIsInitialized] = useState(false);

    useEffect(() => {
        checkAvailability();
    }, []);

    // Check if Health Connect is available on device
    const checkAvailability = async () => {
        try {
            const status = await getSdkStatus();
            setIsAvailable(status === SdkAvailabilityStatus.SDK_AVAILABLE);

            if (status === SdkAvailabilityStatus.SDK_AVAILABLE) {
                const initResult = await initialize();
                setIsInitialized(initResult === SdkAvailabilityStatus.SDK_AVAILABLE);
            }
        } catch (error) {
            console.error('Error checking Health Connect availability:', error);
        }
    };

    // Request permissions for health data
    const requestHealthPermissions = async () => {
        try {
            const permissions = [
                { accessType: 'read', recordType: 'Steps' },
                { accessType: 'read', recordType: 'HeartRate' },
                { accessType: 'read', recordType: 'Distance' },
                { accessType: 'read', recordType: 'ActiveCaloriesBurned' },
                { accessType: 'read', recordType: 'TotalCaloriesBurned' },
                { accessType: 'read', recordType: 'SleepSession' },
            ];

            const granted = await requestPermission(permissions);
            return granted;
        } catch (error) {
            console.error('Error requesting permissions:', error);
            return false;
        }
    };
    
    // Get sleep data for a date range
    const getSleep = async (startDate, endDate= new Date()) => {
        try {
            const result = await readRecords('SleepSession', {
                timeRangeFilter: {
                    operator: 'between',
                    startTime: startDate.toISOString(),
                    endTime: endDate.toISOString(),
                },
            });


            return result;
        } catch (error) {
            console.error('Error reading sleep:', error);
            return 0;
        }
    }

    // Get steps for a date range
    const getSteps = async (startDate, endDate = new Date()) => {
        try {
            const result = await readRecords('Steps', {
                timeRangeFilter: {
                    operator: 'between',
                    startTime: startDate.toISOString(),
                    endTime: endDate.toISOString(),
                },
            });

            // Sum all step counts
            const totalSteps = result.records.reduce((sum, record) => {
                return sum + (record.count || 0);
            }, 0);

            return totalSteps;
        } catch (error) {
            console.error('Error reading steps:', error);
            return 0;
        }
    };

    // Get today's steps
    const getTodaySteps = async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return await getSteps(today);
    };

    // Get heart rate data
    const getHeartRate = async (startDate, endDate = new Date()) => {
        try {
            const result = await readRecords('HeartRate', {
                timeRangeFilter: {
                    operator: 'between',
                    startTime: startDate.toISOString(),
                    endTime: endDate.toISOString(),
                },
            });
            // Return array of heart rate measurements with timestamps
            return result.records.map(record => ({
                bpm: record.samples[0].beatsPerMinute,
                timestamp: record.samples[0].time,
            }));
        } catch (error) {
            console.error('Error reading heart rate:', error);
            return [];
        }
    };

    // Get latest heart rate
    const getLatestHeartRate = async () => {
        const now = new Date();
        const oneHourAgo = new Date(now.getTime() - 60 * 60 * 1000);
        const heartRates = await getHeartRate(oneHourAgo, now);

        if (heartRates.length > 0) {
            // Return the most recent reading
            return heartRates[heartRates.length - 1];
        }
        return null;
    };

    // Get distance traveled
    const getDistance = async (startDate, endDate = new Date()) => {
        try {
            const result = await readRecords('Distance', {
                timeRangeFilter: {
                    operator: 'between',
                    startTime: startDate.toISOString(),
                    endTime: endDate.toISOString(),
                },
            });

            // Sum all distances (in meters)
            const totalDistance = result.records.reduce((sum, record) => {
                return sum + (record.distance?.inMeters || 0);
            }, 0);

            return totalDistance; // Returns meters
        } catch (error) {
            console.error('Error reading distance:', error);
            return 0;
        }
    };

    // Get calories burned
    const getCalories = async (startDate, endDate = new Date()) => {
        try {
            const result = await readRecords('TotalCaloriesBurned', {
                timeRangeFilter: {
                    operator: 'between',
                    startTime: startDate.toISOString(),
                    endTime: endDate.toISOString(),
                },
            });
            // Sum all calories
            const totalCalories = result.records.reduce((sum, record) => {
                return sum + (record.energy?.inKilocalories || 0);
            }, 0);
            return totalCalories;
        } catch (error) {
            return 0;
        }
    };

    // Get all health data for today
    const getTodayHealthData = async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const now = new Date();

        const [steps, heartRates, distance, calories] = await Promise.all([
            getSteps(today, now),
            getHeartRate(today, now),
            getDistance(today, now),
            getCalories(today, now),
        ]);

        return {
            steps,
            heartRates,
            distance: (distance / 1000).toFixed(2), // Convert to km
            calories: Math.round(calories),
            lastHeartRate: heartRates.length > 0 
            ? heartRates[heartRates.length - 1].bpm 
            : null,
        };
    };

    // Open Health Connect settings
    const openSettings = async () => {
        try {
            await openHealthConnectSettings();
        } catch (error) {
            console.error('Error opening settings:', error);
        }
    };

    return {
        isAvailable,
        isInitialized,
        requestHealthPermissions,
        getSteps,
        getTodaySteps,
        getHeartRate,
        getLatestHeartRate,
        getDistance,
        getCalories,
        getSleep,
        getTodayHealthData,
        openSettings,
    };
};

export default useHealthConnect;
