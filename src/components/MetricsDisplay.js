import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MetricsComponent = () => {
  const [metrics, setMetrics] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const response = await axios.get('http://localhost:8000/metrics', {
            headers: {
              authorization: 'mysecrettoken',
            },
          });
        setMetrics(response.data);
        setError(null)

      } catch (error) {
        console.error('Error fetching metrics:', error);
        setError(error)
      }
    };

    fetchMetrics();
  }, []);

  return (
    <div style={{height: "100%"}}>
      {error ? (
        <div style={{height: "100%", display:"flex", justifyContent:"center",alignItems:"center"}}>
  Request Access
</div>) : (
  metrics ? (
    <pre className="metrics-pre">{JSON.stringify(metrics, null, 2)}</pre>
  ) : (
    <p>Loading metrics...</p>
  )
)}
    </div>
  );
};

export default MetricsComponent;
