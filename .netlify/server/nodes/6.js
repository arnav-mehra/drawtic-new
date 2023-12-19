

export const index = 6;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/login/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/6.a_4Do7fz.js","_app/immutable/chunks/scheduler.UdsMBwj9.js","_app/immutable/chunks/index.qYbMvySF.js"];
export const stylesheets = [];
export const fonts = [];
