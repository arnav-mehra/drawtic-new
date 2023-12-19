

export const index = 5;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/game/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/5.IZ5zP4d2.js","_app/immutable/chunks/scheduler.UdsMBwj9.js","_app/immutable/chunks/index.qYbMvySF.js"];
export const stylesheets = [];
export const fonts = [];
