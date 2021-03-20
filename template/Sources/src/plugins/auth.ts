export default function({ $auth }) {
    $auth.onError((error, name, endpoint) => {
        console.error(name, error)
    })
    
    $auth.onRedirect((to, from) => {
        console.error(to)
        // you can optionally change `to` by returning a new value
    })
}
