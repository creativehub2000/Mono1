import 'dotenv/config';
import { Server } from './server';


export class Launcher {

    public server: Server;

    constructor( ) {
        this.server = new Server( );
    }

    public async launchApp( ) {
        try {
            // initialize application
            await this.server.initializePersistence();

            // run server
            this.server.listen(Number(process.env.PORT));
        } catch(error) {
            console.log( 'Cannot launch application! : ', error );
        }
    }
}

new Launcher( ).launchApp( );
