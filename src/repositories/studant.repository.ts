import { prisma } from '../database/prisma-client';
import {
  Student,
  StudentCreate,
  StudentRepository,
} from '../interfaces/studants.interface';

class StudentRepositoryPrisma implements StudentRepository {
  async create(data: StudentCreate): Promise<Student> {
    const result = await prisma.student.create({
      data: {
        name: data.name,
        cpf: data.cpf,
        ra: data.ra,
        email: data.email,
      },
    });
    return result;
  }

  async findByCpfOrRa(cpfOrRa: string): Promise<Student | null> {
    const result = await prisma.student.findFirst({
      where: {
        OR: [{ cpf: cpfOrRa }, { ra: cpfOrRa }],
      },
    });
    return result;
  }

  async listAllStudents(): Promise<Student[]> {
    const result = await prisma.student.findMany();
    return result;
  }

  async updateStudent({ id, name, email }: Student): Promise<Student> {
    const result = await prisma.student.update({
      where: { id },
      data: { name, email },
    });
    return result;
  }

  async delete(id: string): Promise<Student> {
    const result = await prisma.student.delete({
      where: {
        id,
      },
    });
    return result;
  }
}

export { StudentRepositoryPrisma };
