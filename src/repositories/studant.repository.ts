import { prisma } from '../database/prisma-client';
import { Studant, StudantCreate, StudantRepository } from '../interfaces/studants.interface';

class StudantRepositoryPrisma implements StudantRepository {
    async create(data: StudantCreate): Promise<Studant> {
        const result = await prisma.studant.create({
            data: {
                name: data.name,
                cpf: data.cpf,
                ra: data.ra,
                email: data.email
            },
        });
        return result;
    }

    async findByCpfOrRa(cpf: string, ra: string): Promise<Studant | null> {
        const result = await prisma.studant.findFirst({
            where: {
                OR: [{ cpf }, { ra }],
            },
        })
        return result
    }

    async listAllStudants(): Promise<Studant[]> {
        const result = await prisma.studant.findMany()
        return result
    }

    async updateStudant({ id, name, email }: Studant): Promise<Studant> {
        const result = await prisma.studant.update({
            where: { id },
            data: { name, email }
        })
        return result
    }

    async delete(id: string): Promise<Studant> {
        const result = await prisma.studant.delete({
            where: {
                id
            }
        })
        return result
    }
}

export { StudantRepositoryPrisma };

