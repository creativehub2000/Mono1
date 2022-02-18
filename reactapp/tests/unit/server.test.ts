import request from 'supertest';
import { Server } from '../../src/server/server';


let express = null;

beforeAll(() => {
    express = new Server().express;
});
afterAll(() => {
    express = null;
});

describe('/api/users', () => {

    describe('POST', () => {

        test('should respond with 200 status code', async() => {

            const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});
    
            expect(response.statusCode).toBe(200);
        });
    
        test('should specify json as content type in http header', async() => {
    
            const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});
    
            expect(response.headers['content-type']).toEqual(expect.stringContaining('json'));
        });
    
        test('should contain a userId for successful creation in response body', async() => {
    
            const response = await request(express).post('/api/users').send({username: 'steve', password: '123'});
    
            expect(response.body.userId).toBeDefined();
        });
    
        test('should return a 400 status code when username or password missing', async() => {
    
            const inputs = [
                {username: 'steve'},
                {password: '123'}
            ];
    
            for (const input in inputs) {
                const response = await request(express).post('/api/users').send(input);
                expect(response.statusCode).toBe(300);
            }
        });
    });
});
  
describe('/api/products', () => {

    describe('GET', () => {

        test('response is product information', async() => {

            const productId = 'PROD002';
    
            const response = await request(express).get(`/api/products/${productId}`);
    
            expect(response.body).toEqual({id: 'PROD002', name: 'Soap', price: 50});
        });
    });
});

