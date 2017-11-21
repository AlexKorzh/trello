const authorization = localStorage.getItem('token');

console.log('authorization TYPE 1 = ', authorization);

console.log('authorization TYPE 2 = ', localStorage.getItem('token'));

export default authorization;
