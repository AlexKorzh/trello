const initialSate = [
    'myHome',
    'myWork'
]

export default function playList (state = initialSate, action) {
    if (action.type === 'add_playList') {
        return [
            ...state,
            action.text
        ]
    }
    return state;
}
