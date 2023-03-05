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

router.use('/login', [parseJson, validUserForm], async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const _user = await prisma.user.findUnique({ where: { username } });
    if (!_user || _user.password !== password) { return res.sendStatus(418); }
    req.session!.user = _user.isTeacher ? {
        ...(await prisma.user.findUnique({
            ...queryTeacher,
            where: {
                uid: _user.uid
            }
        }) as Teacher), isTeacher: true
    } : {
        ...(await prisma.user.findUnique({
            ...queryStudent,
            where: {
                uid: _user.uid
            }
        }) as Student), isTeacher: false
    };
    return res.sendStatus(200);
})

router.use('/logout', async (req: Request, res: Response) => {
    req.session = null;
    return res.sendStatus(200);
})

router.use('/register', [parseJson, validUserForm], async (req: Request, res: Response) => {
    const { username, password } = req.body;
    const _user = await prisma.user.findUnique({ where: { username } });
    if (_user) { return res.sendStatus(409); }
    await prisma.user.create({ data: { username, password } }).catch((err) => {
        res.sendStatus(409);
        throw err;
    });
    return res.sendStatus(200);
})

// ... other routes

// raw prisma routes
router.use('/prisma', rPrisma)

// echo routes
router.use('/echo', rEcho)

router.use(handlePrismaError)

export default router;
