

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/game/_layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.M9-9o0mB.js","_app/immutable/chunks/scheduler.UdsMBwj9.js","_app/immutable/chunks/index.qYbMvySF.js","_app/immutable/chunks/singletons.wgw1Qp90.js"];
export const stylesheets = [];
export const fonts = [];
