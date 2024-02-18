import { FastifyInstance } from "fastify";
import { createStudent } from "../controllers/students/create.controller";
import { deleteStudent } from "../controllers/students/delete.controller";
import { findAll } from "../controllers/students/find-all.controller";
import { findByCpfOrRa } from "../controllers/students/find-one.controller";
import { updateStudent } from "../controllers/students/update.controller";

export async function studentsRoutes(app: FastifyInstance) {

    app.get('/', findAll)
    app.get('/:cpfOrRa', findByCpfOrRa)

    app.post('/', createStudent)

    app.put('/:id', updateStudent)

    app.delete('/:id', deleteStudent)

}