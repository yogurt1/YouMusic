export const types = {

}

export const ConditionalError = function(err) {
    const {type = err.message} = err

    switch(type) {
        default: throw err
    }
}
