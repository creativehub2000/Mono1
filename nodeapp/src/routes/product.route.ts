import express, { Request, Response, NextFunction, Router } from 'express';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.entity';
import { handleAsync } from '../shared/common';
import { EntityNotFoundError } from '../middlewares/error.middleware';


export class ProductRoute {

    // private api: string;
    public router: Router =  express.Router();
    private service: ProductService;

    constructor( ) {
        this.service = new ProductService(Product);
        // this.router.post( this.api, this.create);
        // this.router.get( this.api, this.find );
        this.router.get( `/:id`, this.get );
        // this.router.patch( `${this.api}/:id`, this.patch );
        // this.router.delete( `${this.api}/:id`, this.delete );
    }

    public get = async( request: Request, response: Response, next: NextFunction ) => {
            
        const id = request.params.id;

        let [ item, error ] = await handleAsync( this.service.get(id) );
        if ( error ) return next( error );

        // const item = this.service.get(id);

        if ( item ) {
            response.send( item );
        } else {
            next( new EntityNotFoundError(id) );
        }
    }
}
