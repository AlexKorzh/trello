export default function registerUser (user) {
    return {
        type: 'REGISTER_USER',
        user: user
    };
};
