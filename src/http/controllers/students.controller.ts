import { FastifyReply, FastifyRequest } from 'fastify';
import { StudentRepositoryPrisma } from '../../repositories/studant.repository';
import { StudentUseCase } from '../../uses-cases/student.usecases';

export function studentsController() {
    const studentRepository = new StudentRepositoryPrisma();
    const studentUseCase = new StudentUseCase(studentRepository);

    const createStudent = async (request: any, reply: any) => {
        const { cpf, name, ra, email } = request.body
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

    const findAll = async (request: FastifyRequest, reply: FastifyReply) => {
        try {
            const data = await studentUseCase.listAllStudents()
            reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    }

    const findByCpfOrRa = async (request: any, reply: any) => {
        const { cpfOrRa } = request.params
        try {
            const data = await studentUseCase.findByCpfOrRa(cpfOrRa)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    }

    const updateStudent = async (request: any, reply: any) => {
        const { id } = request.params
        const { name, email } = request.body
        try {
            const data = await studentUseCase.updateStudent({
                id, name, email
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    }

    const deleteStudent = async (request: any, reply: any) => {
        const { id } = request.params
        try {
            const data = await studentUseCase.delete(id)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    }

    return {
        createStudent,
        findAll,
        findByCpfOrRa,
        updateStudent,
        deleteStudent
    }
}