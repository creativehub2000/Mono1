

export const handleAsync = ( promise: Promise<any> ) => {
    
    return promise
        .then( (data: any) => [data, null] )
        .catch( (error: any) => [null, error] );
}
