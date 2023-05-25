import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MetricsComponent = () => {
  const [metrics, setMetrics] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/metrics');
        setMetrics(response.data);
      } catch (error) {
        console.error('Error fetching metrics:', error);
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div>
      {metrics ? (
        <pre className="metrics-pre">{JSON.stringify(metrics, null, 2)}</pre>
      ) : (
        <p>Loading metrics...</p>
      )}
      
    </div>
  );
};

export default MetricsComponent;
