import { beforeEach, describe, expect, it } from '@jest/globals';
import { Studant, StudantCreate, StudantRepository } from '../interfaces/studants.interface';
import { StudentUseCase } from './student.usecases';

class MockStudantRepository implements StudantRepository {
    private students: Studant[] = [];

    async create(student: StudantCreate): Promise<Studant> {
        const newStudent = { ...student, id: (this.students.length + 1).toString() };
        this.students.push(newStudent);
        return newStudent;
    }

    async findByCpfOrRa(cpf: string, ra: string): Promise<Studant | null> {
        return this.students.find((student) => student.cpf === cpf || student.ra === ra) || null;
    }

    async listAllStudants(): Promise<Studant[]> {
        return this.students;
    }

    async updateStudant(student: Studant): Promise<Studant> {
        const index = this.students.findIndex((s) => s.id === student.id);
        this.students[index] = { ...this.students[index], ...student };
        return this.students[index];
    }

    async delete(id: string): Promise<Studant | null> {
        const index = this.students.findIndex((s) => s.id === id);
        if (index !== -1) {
            return this.students.splice(index, 1)[0];
        }
        return null;
    }

    async deleteAll(): Promise<void> {
        this.students = [];
    }
}

describe('StudentUseCase', () => {
    let studentUseCase: StudentUseCase;
    let mockStudantRepository: MockStudantRepository;

    beforeEach(() => {
        mockStudantRepository = new MockStudantRepository();
        studentUseCase = new StudentUseCase(mockStudantRepository);
    });

    it('creates a new student', async () => {
        const studentData: StudantCreate = {
            name: 'Bill Gates',
            cpf: '123.456.789-03',
            ra: '123457',
            email: "bill@email.com"
        };

        const createdStudent = await studentUseCase.create(studentData);

        expect(createdStudent).toHaveProperty('id');
        expect(createdStudent.name).toBe(studentData.name);
        expect(createdStudent.cpf).toBe(studentData.cpf);
        expect(createdStudent.ra).toBe(studentData.ra);
    });

    it('lists all students', async () => {
        const studentsData: StudantCreate[] = [
            { name: 'Bill Gates', cpf: '123.456.789-01', ra: '123456', email: "bill@email.com" },
            { name: 'Steve Jobs', cpf: '987.654.321-09', ra: '654321', email: "steve@email.com" },
        ];

        await Promise.all(studentsData.map((student) => studentUseCase.create(student)));

        const allStudents = await studentUseCase.listAllStudants();

        expect(allStudents).toHaveLength(studentsData.length);
    });

    it('updates a student', async () => {
        const studentData: StudantCreate = { name: 'Bill Gates', cpf: '123.456.789-01', ra: '123456', email: "bill@email.com" };
        const createdStudent = await studentUseCase.create(studentData);

        const updatedStudentData: Studant = { ...createdStudent, name: 'Elon Musk' };
        const updatedStudent = await studentUseCase.updateStudant(updatedStudentData);

        expect(updatedStudent.name).toBe('Elon Musk');
    });

    it('deletes a student', async () => {
        const studentData: StudantCreate = {
            name: 'Bill Gates',
            cpf: '123.456.789-01',
            ra: '123456',
            email: 'bill@email.com'
        };

        const createdStudent = await studentUseCase.create(studentData);
        const deletedStudent = await studentUseCase.delete(createdStudent.id);

        expect(deletedStudent).toEqual(createdStudent);
    });
});