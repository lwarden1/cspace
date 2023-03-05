import { Router, Request, Response } from "express"

const router = Router()

router.get('/', async (req: Request, res: Response) => {
    res.json(req.body);
})

router.all('/request', async (req: Request, res: Response) => {
    res.json(req);
})

router.get('/user', async (req: Request, res: Response) => {
    res.json(req.session!.user);
})

router.get('/year', async (req: Request, res: Response) => {
    res.json((new Date(Date.now())).getUTCFullYear());
})

router.get('/season', async (req: Request, res: Response) => {
    res.json((new Date(Date.now())).getUTCMonth() < 6 ? 'Spring' : 'Fall');
})

export default router;
