importScripts('compile.js'); // 引用其他文件
self.addEventListener('fetch', ev => {
    ev.respondWith(async function () {
        // caches.match(ev.request).then(function (response) {
        //     return response || fetch(ev.request);
        // });
        const url = ev.request.url;
        if (/\.html/.test(url)) {
            const tmpl = await (await fetch(ev.request)).text();
            const data = await (await fetch('./data.json')).json();
            const body = template.compile(tmpl)(data);
            return new Response(body, {
                headers: {
                    'content-type': 'text/html; charset=utf-8'
                }
            });
        } else {
            return fetch(ev.request);
        }
    }());
});
