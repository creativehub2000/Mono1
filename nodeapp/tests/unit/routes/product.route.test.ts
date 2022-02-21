import request from 'supertest';
import { Application } from 'express';
import { Server } from '../../../src/server';
import { ProductService } from '../../../src/services/product.service';
import { Product } from '../../../src/models/product.entity';
import { newDb } from 'pg-mem';
import { Connection } from 'typeorm';


let express: Application = new Server().express;
let connection: Connection = null;

const productPayload = {name: 'Soap', price: 40};

beforeAll(async() => {
    connection = await newDb().adapters.createTypeormConnection({
        type: 'postgres',
        entities: [Product],
        synchronize: true
    });
});
afterAll(async() => {
    connection.close();
});


describe('/api/products', () => {

    describe('GET', () => {

        test('should return 400 status if product does not exist', async() => {
            
            const productId = 112;
    
            const response = await request(express).get(`/api/products/${productId}`);
    
            expect(response.statusCode).toBe(400);
        });

        test('should return 200 status & product details if product does exists', async() => {

            // create a product through the product service
            const item = await new ProductService(Product).create(productPayload);
    
            // access it through api
            const response = await request(express).get(`/api/products/${item.id}`);
    
            expect(response.statusCode).toBe(200);
            expect(response.body.id).toBe(item.id);
        });

        test('should return 200 status & product name equals Soap if product does exists', async() => {

            const response = await request(express).get(`/api/products/${1}`);
    
            expect(response.statusCode).toBe(200);
            expect(response.body.name).toBe('Soap');
        });
    });
});

// describe('/api/users', () => {

//     describe('POST', () => {

//         test('should respond with 200 status code', async() => {

//             const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});
    
//             expect(response.statusCode).toBe(200);
//         });
    
//         test('should specify json as content type in http header', async() => {
    
//             const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});
    
//             expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
//         });
    
//         test('should contain a userId for successful creation in response body', async() => {
    
//             const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});
    
//             expect(response.body.userId2).toBeDefined();
//         });
    
//         test('should return a 400 status code when username or password missing', async() => {
    
//             const inputs = [
//                 {username: 'steve'},
//                 {password: '123'}
//             ];
    
//             for (const input in inputs) {
//                 const response = await request(express).post('/api/users').send(input);
//                 expect(response.statusCode).toBe(400);
//             }
//         });
//     });
// });

