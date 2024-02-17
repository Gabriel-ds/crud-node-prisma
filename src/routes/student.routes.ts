import { FastifyInstance } from 'fastify';
import { StudantCreate, StudantUpdate } from '../interfaces/studants.interface';
import { StudantRepositoryPrisma } from '../repositories/studant.repository';
import { StudentUseCase } from '../uses-cases/student.usecases';

export async function studentRoutes(fastify: FastifyInstance) {
    const studentRepository = new StudantRepositoryPrisma();
    const studentUseCase = new StudentUseCase(studentRepository);

    fastify.post<{ Body: StudantCreate }>('/', async (req, reply) => {
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
            const data = await studentUseCase.listAllStudants()
            reply.send(data)
        } catch (error) {
            reply.send(error)
        }
    })

    fastify.put<{ Body: StudantUpdate, Params: { id: string } }>('/:id', async (req, reply) => {
        const { id } = req.params
        const { name, email } = req.body
        try {
            const data = await studentUseCase.updateStudant({
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