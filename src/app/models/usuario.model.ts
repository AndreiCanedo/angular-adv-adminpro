import { environment } from "../../environments/environment";



//const base_url= environment.base_url;
const base_url= 'http://localhost:3000/api';

export class Usuario {

    constructor(
        public nombre: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: any,
    ){}

    get imgenUrl(){

        if( !this.img ){
            return `${ base_url }/upload/usuarios/no-image`;
        } else if( this.img?.includes('http') ){
            return this.img;
        }else if( this.img ){
            return `${ base_url }/upload/usuarios/${ this.img }`;
        }else{
            return `${ base_url }/upload/usuarios/no-image`;
        }
    }

}



