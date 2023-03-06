import { Router, Request, Response, NextFunction } from "express";
import prisma from "../prisma";
import { parseJson, validateUser } from '../utils';

const router = Router();

router.all('/:model/:op', [parseJson, validateUser, (req: Request, res: Response, next: NextFunction) => {
    if (!req.session!.user?.isTeacher) {
        res.sendStatus(401);
    } else {
        next()
    }
}], async (req: Request, res: Response) => {
    console.log(`[${req.originalUrl}]: Prisma ${req.params.model}.${req.params.op}(${JSON.stringify(req.body)})`)
    try {
        if (['class', 'semester', 'user'].includes(req.params.model)) {
            // @ts-ignore
            const model = prisma[req.params.model];
            if (req.params.op in model) {
                const op = model[req.params.op];
                // @ts-ignore
                return res.json(await op(req.body));
            }
        }
    } catch (e) {
        console.log(e)
        return res.sendStatus(500);
    }
    res.sendStatus(404)
})

export default router;
