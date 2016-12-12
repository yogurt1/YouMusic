const request = async req => {
    try {
        const res = await fetch(req)

        if (!res.ok) {
            const err = new Error(res.statusText)
            err.status = err.status
        }

        const data = await res.json()
        return data
    } catch(err) {
        throw err
    }
}

export default (...args) => request(new Request(...args))
