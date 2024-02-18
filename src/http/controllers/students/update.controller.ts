import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { StudentRepositoryPrisma } from "../../../repositories/studant.repository";
import { StudentUseCase } from "../../../uses-cases/student.usecases";

export async function updateStudent(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const studentRepository = new StudentRepositoryPrisma();
    const studentUseCase = new StudentUseCase(studentRepository);

    const updateStudentBodySchema = z.object({
        name: z.string(),
        email: z.string(),
    })

    const { id } = request.params
    const { name, email } = updateStudentBodySchema.parse(request.body)

    try {
        const data = await studentUseCase.updateStudent({
            id, name, email
        })
        return reply.send(data)
    } catch (error) {
        reply.send(error)
    }
}