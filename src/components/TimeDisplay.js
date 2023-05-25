import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TimeDisplay = () => {
  const [serverTime, setServerTime] = useState('');
  const [clientTime, setClientTime] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchServerTime = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:8000/time', {
        headers: {
          authorization: 'mysecrettoken',
        },
      });
      setServerTime(response.data.serverTime);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching server time:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServerTime();
    const interval = setInterval(() => {
      fetchServerTime();
    }, 30000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = new Date().getTime() / 1000;
      const difference = currentTime - serverTime;
      const formattedTime = new Date(difference * 1000)
        .toISOString()
        .substr(11, 8);
      setClientTime(formattedTime);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [serverTime]);

  return (
    <div>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div>Server Time: {serverTime}</div>
          <div>Client Time Difference: {clientTime}</div>
        </>
      )}
    </div>
  );
};

export default TimeDisplay;
