import env from '@/env';
import Vapi from '@vapi-ai/web';

export const vapi = new Vapi(env.vapi.apiToken);