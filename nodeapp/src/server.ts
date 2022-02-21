import express, { Application } from 'express';
import { createConnection } from 'typeorm';
import config from './ormconfig';
import { errorHandlingMiddleware } from './middlewares/error.middleware';
import { ProductRoute } from './routes/product.route';


export class Server {

    public express: Application = null;

    constructor( ) {
        console.log( 'Initializing application...' );
        this.express = express();
        this.registerMiddlewares();
        this.registerRoutes();
        this.registerErrorHandlers();
    }

    public async initializePersistence( ) {

        try {
            // connect to db (based on NODE_ENV)
            await createConnection(config);
            console.log( 'Database connected!' );
        } catch ( error ) {
            console.log( 'Database connection error : ', error );
            throw error;
        }
    }
    
    private registerMiddlewares( ) {
        // add middleware
        this.express.use( express.json() );
    }

    private registerRoutes( ) {
        // add routes
        this.express.use( `/api/products`, new ProductRoute().router );
    }

    private registerErrorHandlers( ) {

        // this.express.use( handleUnhandledRoutes );
        this.express.use( errorHandlingMiddleware );
    }

    public listen( port: number ) {
        return this.express.listen(port, ( ) => {
            console.log(`Server running at ${port}`);
        });
    }
}

