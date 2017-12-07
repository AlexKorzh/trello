const token = {
    'get': () => localStorage.getItem('token'),
    'set': value => localStorage.setItem('token', value)
};

export default token;
