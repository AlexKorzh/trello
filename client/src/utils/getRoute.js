const getRoute = () => {
    const { pathname } = window.location;
    const routes = pathname.split('/').filter(i => i);

    return {
        'all': routes,
        'root': routes[0]
    }
}

export default getRoute;
