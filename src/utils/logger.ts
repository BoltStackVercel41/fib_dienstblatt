export const logger = {
  debug: (...args: unknown[]) => {
    console.log('[Debug]:', ...args);
  },
  error: (...args: unknown[]) => {
    console.error('[Error]:', ...args);
  }
};