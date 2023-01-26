import { Configuration } from 'openai';

export const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

export const OPENAIConfig = {
  temperature: 1,
  max_tokens: 1800,
};
