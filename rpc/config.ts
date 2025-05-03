import { hc } from 'hono/client';
import type { AppTypes } from '@/server';

const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

export const client = hc<AppTypes>(baseUrl);
export const baseRpcUrl = client.api.rpc;
