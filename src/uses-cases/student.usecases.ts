import { Studant, StudantCreate, StudantRepository, StudantUpdate } from '../interfaces/studants.interface';
import { validateStudentData } from './validationsUtils';

class StudentUseCase {
    private studentRepository: StudantRepository;
    constructor(studentRepository: StudantRepository) {
        this.studentRepository = studentRepository;
    }

    async create({ name, cpf, ra, email }: StudantCreate): Promise<Studant> {
        validateStudentData({ cpf, name, ra, email })
        const verifyExistStudant = await this.studentRepository.findByCpfOrRa(cpf, ra)
        if (verifyExistStudant) {
            throw new Error('Estudante já existe.');
        }

        const result = await this.studentRepository.create({ name, cpf, ra, email });
        return result;
    }

    async listAllStudants(): Promise<Studant[]> {
        const result = await this.studentRepository.listAllStudants()
        return result
    }

    async updateStudant({ id, name, email }: StudantUpdate) {
        const result = await this.studentRepository.updateStudant({
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

