import client from './client';

export const predictFraud = async (data) => {
  const response = await client.post('/predict', data);
  return response.data;
};