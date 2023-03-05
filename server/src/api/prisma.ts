import { Router, Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { validateUser } from '../utils';

const router = Router();

router.all('/:model/:op', [validateUser, (req: Request, res: Response, next: NextFunction) => {
    if (!req.session!.user!.isTeacher) {
        return res.sendStatus(401);
    }
    next();
}], async (req: Request, res: Response) => {
    if (req.params.model in ['class', 'semester', 'user']) {
        // @ts-ignore
        const model = prisma[req.params.model];
        if (req.params.op in model) {
            // @ts-ignore
            return res.json(await model[req.params.op](req.body));
        }
        res.sendStatus(404);
    }
})

export default router;
