import { baseRpcUrl } from '@/rpc/config';

const route = baseRpcUrl.test;

export const register = async () => {
  const response = await route.$get();
  if (!response.ok) {
    throw new Error('Failed to fetch data');
  }
  const data = await response.json();

  return data.message;
};
