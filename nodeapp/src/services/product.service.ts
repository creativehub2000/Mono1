import { getRepository } from 'typeorm';
import { handleAsync } from '../shared/common';
import { ServerError } from '../middlewares/error.middleware';


// const items = [
//     {id: 'ITEM001', name: 'Toothpaste', price: 40},
//     {id: 'ITEM002', name: 'Soap', price: 30},
//     {id: 'ITEM003', name: 'Biscuit', price: 20}
// ];

export class ProductService {

    public entity: any;

    constructor( entity: any ) {
        this.entity = entity;
    }

    public create = async( data: any ) => {
       
        const newItem = getRepository( this.entity ).create( data );
        let [ item, error ] = await handleAsync( getRepository(this.entity).save(newItem) );
        if ( error ) throw new ServerError( error );

        // const newId = `ITEM00${items.length+1}`;
        // const item = {id: newId, name: data.name, price: data.price};
        // items.push(item);

        return item;
    }

    public find = async( ) => {

        let [ items, error ] = await handleAsync( getRepository(this.entity).find() );
        if ( error ) throw new ServerError( error );

        return items;
    }

    public get = async( id: string ) => {
        
        let [ item, error ] = await handleAsync( getRepository(this.entity).findOne(id) );
        if ( error ) throw new ServerError( error );

        // let item = null;
        // items.forEach(item => {
        //     if (item.id === id) {
        //         item = item;
        //     }
        // });

        return item;
    }

    public patch = async( id: string, data: any ) => {
        
        let [ response, error ] = await handleAsync( getRepository(this.entity).update(id, data) );
        if ( error ) throw new ServerError( error );

        let [ updatedItem, error2 ] = await handleAsync( getRepository(this.entity).findOne(id) );
        if ( error2 ) throw new ServerError( error2 );

        // const updatedItem = items.forEach(item => {
        //     if (item.id === id) {
        //         item.name = data.name;
        //         item.price = data.price;
        //         return item;
        //     }
        // });

        return updatedItem;
    }

    public delete = async( id: string ) => {
        
        let [ response, error ] = await handleAsync( getRepository(this.entity).delete(id) );
        if ( error ) throw new ServerError( error );

        // const itemIndex = items.findIndex(item => {
        //     if (item.id === id)
        //         return true;
        // });
        // if (itemIndex != -1) {
        //     items.splice(itemIndex, 1);
        //     return 1;
        // }
        // return 0;

        return response;
    }
}
