const protocol = window.location.protocol;
const host = window.location.hostname;

const hosts = {
    'dev': ['localhost'],
    'public': ['']
};

const ports = {
    'dev': '3090',
    'public': ''
}

let currentHost;

for (let key in hosts) {
    if (hosts[key].includes(host)) {
        let port = ports[key];

        currentHost = `${protocol}//${host}${port && ':' + port}`;
    }
}

export default currentHost;
