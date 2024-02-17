import { Student, StudentCreate, StudentRepository, StudentUpdate } from '../interfaces/studants.interface';
import { validateStudentData } from './validationsUtils';

class StudentUseCase {
    private studentRepository: StudentRepository;
    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async create({ name, cpf, ra, email }: StudentCreate): Promise<Student> {
        validateStudentData({ cpf, name, ra, email })
        const verifyExistCpfStudent = await this.studentRepository.findByCpfOrRa(cpf)
        if (verifyExistCpfStudent) {
            throw new Error('Estudante já existe com esse cpf.');
        }
        const verifyExistRaStudent = await this.studentRepository.findByCpfOrRa(ra)
        if (verifyExistRaStudent) {
            throw new Error('Estudante já existe com esse RA.');
        }

        const result = await this.studentRepository.create({ name, cpf, ra, email });
        return result;
    }

    async listAllStudents(): Promise<Student[]> {
        const result = await this.studentRepository.listAllStudents()
        return result
    }

    async findByCpfOrRa(cpfOrRa: string): Promise<Student | null> {
        const result = await this.studentRepository.findByCpfOrRa(cpfOrRa)
        if (!result) {
            throw new Error('Estudante não encontrado')
        }
        return result
    }

    async updateStudent({ id, name, email }: StudentUpdate) {
        const result = await this.studentRepository.updateStudent({
            id,
            name,
            email
        })
        return result
    }

    async delete(id: string) {
        const result = await this.studentRepository.delete(id)
        return result
    }
}

export { StudentUseCase };

