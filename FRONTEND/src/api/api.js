import client from './client';

export const predictFraud = async (data) => {
  const response = await client.post('/predict', data);
  return response.data;
};

export const getStats = async () => {
  const response = await client.get('/stats');
  return response.data;
};

export const getClaims = async () => {
  const response = await client.get('/claims');
  return response.data;
};

export const getAnalytics = async () => {
  const response = await client.get('/analytics');
  return response.data;
};
