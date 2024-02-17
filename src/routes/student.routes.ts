import { FastifyInstance } from 'fastify';
import { StudentCreate, StudentUpdate } from '../interfaces/studants.interface';
import { StudentRepositoryPrisma } from '../repositories/studant.repository';
import { StudentUseCase } from '../uses-cases/student.usecases';

export async function studentRoutes(fastify: FastifyInstance) {
    const studentRepository = new StudentRepositoryPrisma();
    const studentUseCase = new StudentUseCase(studentRepository);

    fastify.post<{ Body: StudentCreate }>('/', async (req, reply) => {
        const { cpf, name, ra, email } = req.body
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
    })

    fastify.get('/', async (req, reply) => {
        try {
            const data = await studentUseCase.listAllStudents()
            reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.get<{ Params: { cpfOrRa: string } }>('/:cpfOrRa', async (req, reply) => {
        const { cpfOrRa } = req.params
        try {
            const data = await studentUseCase.findByCpfOrRa(cpfOrRa)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.put<{ Body: StudentUpdate, Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params
        const { name, email } = req.body
        try {
            const data = await studentUseCase.updateStudent({
                id, name, email
            })
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.delete<{ Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params
        try {
            const data = await studentUseCase.delete(id)
            return reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })
}