import express, { Request, Response, NextFunction } from 'express';


export const errorHandlingMiddleware = ( error: HttpError, request: Request, response: Response, next: NextFunction ) => {

    let status = error.status || 500;
    let message = error.message || 'Something went wrong!';

    response.sendStatus(status).send({
        status: status,
        message: message
    });
    // response.send( {
    //     status: status,
    //     message: message
    // } );
}

export const handleUnhandledRoutes = ( request: Request, response: Response, next: NextFunction ) => {

    throw new RouteNotImplementedError( request.path );
}


export class HttpError extends Error {

    status: number;
    message: string;

    constructor( status: number, message: string ) {

        super(message);
        this.status = status;
        this.message = message;
    }
}

export class RouteNotImplementedError extends HttpError {

    constructor( route: string ) {

        super( 400, `Route ${route} not found!` );
    }
}

export class ServerError extends HttpError {

    constructor( error: any ) {
        super( 500, `Server error : ${error.message}` );
    }
}

export class EntityNotFoundError extends HttpError {

    constructor( id: string ) {
        super( 400, `Entity with id ${id} not found!` );
    }
}

export class DataValidationError extends HttpError {

    constructor( errors: string ) {
        super( 400, `Validation Errors : ${errors}` );
    }
}
