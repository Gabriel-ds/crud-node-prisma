export interface Studant {
    id: string;
    name: string;
    ra: string;
    cpf: string
    email: string
}

export interface StudantCreate {
    name: string;
    ra: string;
    cpf: string;
    email: string;
}

export interface StudantUpdate {
    id: string;
    name: string;
    email: string;
}
export interface StudantRepository {
    create(data: StudantCreate): Promise<Studant>;
    findByCpfOrRa(cpf: string, ra: string): Promise<Studant | null>
    listAllStudants(): Promise<Studant[]>;
    updateStudant({ id, name, email }: StudantUpdate): Promise<Studant>;
    delete(id: string): Promise<Studant | null>;
}
