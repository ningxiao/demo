importScripts('compile.js'); // 引用其他文件
self.addEventListener('fetch', ev => {
    ev.respondWith(async function () {
        // caches.match(ev.request).then(function (response) {
        //     return response || fetch(ev.request);
        // });
        const url = ev.request.url;
        if (/\.html/.test(url)) {
            const dataSource = {};
            const res = await fetch(ev.request);
            const tmpl = await res.text();
            const sdl = tmpl.replace(/<script\s+type=\"text\/json\">([\w\W]*?)<\/script>/, (matchs, $1) => {
                if ($1) {
                    const data = JSON.parse($1);
                    Reflect.set(dataSource, data.key, data.source);
                }
                return '';
            });
            const body = template.compile(sdl)(dataSource);
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
