import { Student, StudentCreate, StudentRepository, StudentUpdate } from '../interfaces/studants.interface';
import { validateStudentData } from './validationsUtils';

class StudentUseCase {
    private studentRepository: StudentRepository;
    constructor(studentRepository: StudentRepository) {
        this.studentRepository = studentRepository;
    }

    async create({ name, cpf, ra, email }: StudentCreate): Promise<Student> {
        validateStudentData({ cpf, name, ra, email })
        const verifyExistStudent = await this.studentRepository.findByCpfOrRa(cpf, ra)
        if (verifyExistStudent) {
            throw new Error('Estudante já existe.');
        }

        const result = await this.studentRepository.create({ name, cpf, ra, email });
        return result;
    }

    async listAllStudents(): Promise<Student[]> {
        const result = await this.studentRepository.listAllStudents()
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

