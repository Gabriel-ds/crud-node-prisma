import { FastifyReply, FastifyRequest } from "fastify";
import { StudentRepositoryPrisma } from "../../../repositories/studant.repository";
import { StudentUseCase } from "../../../uses-cases/student.usecases";

export async function findAll(request: FastifyRequest, reply: FastifyReply) {
    const studentRepository = new StudentRepositoryPrisma();
    const studentUseCase = new StudentUseCase(studentRepository);
    try {
        const data = await studentUseCase.listAllStudents()
        reply.send(data)
    } catch (error) {
        reply.send(error)
    }
}