import { FastifyReply, FastifyRequest } from "fastify";
import { z } from 'zod';
import { StudentRepositoryPrisma } from "../../../repositories/studant.repository";
import { StudentUseCase } from "../../../uses-cases/student.usecases";

export async function createStudent(request: FastifyRequest, reply: FastifyReply) {
    const studentRepository = new StudentRepositoryPrisma();
    const studentUseCase = new StudentUseCase(studentRepository);

    const createStudentQuerySchema = z.object({
        cpf: z.string(),
        name: z.string(),
        ra: z.string(),
        email: z.string(),
    })

    const { cpf, name, ra, email } = createStudentQuerySchema.parse(request.body)

    try {
        const data = await studentUseCase.create({
            name,
            cpf,
            ra,
            email
        })
        return reply.send(data)
    } catch (error) {
        reply.send(error)
    }
}