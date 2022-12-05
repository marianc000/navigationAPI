// router.js
const handlers = [];

export function addRoute(route, callback) {
    handlers.unshift({ route, callback });
}

export function start() {
    navigation.addEventListener('navigate', onNavigate);
    location.assign(location.href);
}

function onNavigate(e) {
    const callback = findHandler(e.destination.url);

    if (callback) {
        // e.transitionWhile(callback());
        e.intercept({
            async handler() {
                await callback();
            }
        });
    }
}

function argumentsInUrl(route, path) {
    return route.exec(path).slice(1);
}

function findHandler(url) {
    const path = url.replace(document.baseURI, '').split('?')[0]; // absolute to relative without parameters
    const handler = handlers.find(o => o.route.test(path));
    if (handler)
        return () => handler.callback(...argumentsInUrl(handler.route, path));
}