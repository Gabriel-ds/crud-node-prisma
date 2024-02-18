import { FastifyInstance } from "fastify";
import { studentsController } from "../controllers/students.controller";
import { findAll } from "../controllers/students/find-all.controller";

export const studentsRoutes = (app: FastifyInstance) => {
    const { createStudent, deleteStudent, findByCpfOrRa, updateStudent } = studentsController()

    app.get('/', findAll)
    app.get('/:cpfOrRa', findByCpfOrRa)

    app.post('/', createStudent)

    app.put('/:id', updateStudent)

    app.delete('/:id', deleteStudent)
}