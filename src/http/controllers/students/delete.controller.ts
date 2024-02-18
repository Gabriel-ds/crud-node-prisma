import { FastifyReply, FastifyRequest } from "fastify";
import { StudentRepositoryPrisma } from "../../../repositories/studant.repository";
import { StudentUseCase } from "../../../uses-cases/student.usecases";

export async function deleteStudent(request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply) {
    const studentRepository = new StudentRepositoryPrisma();
    const studentUseCase = new StudentUseCase(studentRepository);
    const { id } = request.params
    try {
        const data = await studentUseCase.delete(id)
        return reply.send(data)
    } catch (error) {
        reply.send(error)
    }
}