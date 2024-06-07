import { Hospital } from "./hospital.model";

interface _MedicoUser{
    _id: string;
    nombre: string;
    img:string;
}

export class Medico {

    constructor(
        public nombre: string,
        public uid: string,
        public img: string,
        public usuario?: _MedicoUser,
        public hospital?: Hospital
        //puedo hacerlo asi porque al pedir get en medico
        //viene los mismos requerimientos que Hospital
    ){}
}