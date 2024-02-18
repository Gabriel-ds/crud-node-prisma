import cors from '@fastify/cors';
import Fastify from 'fastify';
import { studentsRoutes } from './http/routes/students.routes';

const app = Fastify();

app.register(cors);

app.register(studentsRoutes, {
    prefix: '/students'
});

app.listen({ port: 3100 }, () => {
    console.log('----- Server listening on port 3100 -----');
});