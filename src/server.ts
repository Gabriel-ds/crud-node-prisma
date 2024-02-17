import cors from '@fastify/cors';
import Fastify from 'fastify';
import { studentRoutes } from './routes/student.routes';

const app = Fastify();

app.register(cors);

app.register(studentRoutes, {
    prefix: '/students',
});

app.listen({ port: 3100 }, () => {
    console.log('----- Server listening on port 3100 -----');
});