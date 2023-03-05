import { Router, Request, Response, ErrorRequestHandler } from "express";
import rEcho from './echo';
import rPrisma from "./prisma";
import { handlePrismaError, parseJson, validateForm } from '../utils';
import z from "zod";
import prisma from "../prisma";
import { queryStudent, queryTeacher } from "../cspace";

const validUserForm = validateForm(z.object({
    username: z.string().trim().min(5).max(32),
    password: z.string().trim().min(8).max(64),
}));

const router = Router();

router.post('/login', [parseJson, validUserForm], async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const user = await prisma.user.findUnique({ where: { username } });
    if (!user || user.password !== password) {
        res.sendStatus(401);
    } else {
        if (user.isTeacher) {
            const teacher = await prisma.user.findUnique({ ...queryTeacher, where: { uid: user.uid } }) as Teacher;
            req.session!.user = { ...teacher, isTeacher: true }
        } else {
            const student = await prisma.user.findUnique({ ...queryStudent, where: { uid: user.uid } }) as Student;
            req.session!.user = { ...student, isTeacher: false }
        }
        res.sendStatus(200);
    }
})

router.post('/logout', async (req: Request, res: Response) => {
    req.session = null;
    res.sendStatus(200);
})

router.post('/register', [parseJson, validUserForm], async (req: Request, res: Response) => {
    // handlePrismaError will catch any errors thrown by prisma
    await prisma.user.create({ data: req.body })
    res.sendStatus(200)
})

// ... other routes

// raw prisma routes
router.use('/prisma', rPrisma)

// echo routes
router.use('/echo', rEcho)

router.use(handlePrismaError)

export default router;
