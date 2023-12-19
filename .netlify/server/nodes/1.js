

export const index = 1;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/error.svelte.js')).default;
export const imports = ["_app/immutable/nodes/1.VhRjx605.js","_app/immutable/chunks/scheduler.UdsMBwj9.js","_app/immutable/chunks/index.qYbMvySF.js","_app/immutable/chunks/singletons.wgw1Qp90.js"];
export const stylesheets = [];
export const fonts = [];
