export interface Student {
    id: string;
    name: string;
    ra: string;
    cpf: string
    email: string
}

export interface StudentCreate {
    name: string;
    ra: string;
    cpf: string;
    email: string;
}

export interface StudentUpdate {
    id: string;
    name: string;
    email: string;
}
export interface StudentRepository {
    create(data: StudentCreate): Promise<Student>;
    findByCpfOrRa(cpf: string, ra: string): Promise<Student | null>
    listAllStudents(): Promise<Student[]>;
    updateStudent({ id, name, email }: StudentUpdate): Promise<Student>;
    delete(id: string): Promise<Student | null>;
}
