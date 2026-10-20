// A separate Vite cache and no file watching keep concurrent development from reloading trials.
export {};
(globalThis as typeof globalThis & { __MIDLINE_MAP__?: string }).__MIDLINE_MAP__ = 'howling';
process.env.PORT ??= '5182';
const { startServer } = await import('../server/server');
await startServer({ isolatedValidation: true });
