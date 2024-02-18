import { FastifyReply, FastifyRequest } from "fastify";
import { z } from "zod";
import { StudentRepositoryPrisma } from "../../../repositories/studant.repository";
import { StudentUseCase } from "../../../uses-cases/student.usecases";

export async function findByCpfOrRa(request: FastifyRequest, reply: FastifyReply) {
    const studentRepository = new StudentRepositoryPrisma();
    const studentUseCase = new StudentUseCase(studentRepository);

    const findOneQuerySchema = z.object({
        cpfOrRa: z.string(),
    })

    const { cpfOrRa } = findOneQuerySchema.parse(request.params)
    try {
        const data = await studentUseCase.findByCpfOrRa(cpfOrRa)
        return reply.send(data)
    } catch (error) {
        reply.send(error)
    }
}