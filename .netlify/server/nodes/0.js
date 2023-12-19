

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.pnCBBcTy.js","_app/immutable/chunks/scheduler.UdsMBwj9.js","_app/immutable/chunks/index.qYbMvySF.js"];
export const stylesheets = ["_app/immutable/assets/0.aeMDMsO7.css"];
export const fonts = [];
