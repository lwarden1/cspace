import { Router, Request, Response } from "express"
import { prisma } from "../prisma"
import { queryClassPreview } from '../cspace';
import { parseJson, validateForm } from '../utils';
import z from "zod"
import { Prisma } from "@prisma/client";

const form = z.object({
    // fall or spring
    season: z.literal(0).or(z.literal(1)),
    year: z.number().min(2020).max(2100),
    teacher: z.string().min(5).max(32).optional(),
    // titleStartsWith: z.string().min(1).max(32).optional(),
    // titleEndsWith: z.string().min(1).max(32).optional(),
    // titleContains: z.string().min(1).max(32).optional(),
    // title: z.string().min(1).max(32).optional(),

    // ... department, credits, etc.
})

type Form = z.infer<typeof form>;

function getQuery(data: Form): Prisma.ClassFindManyArgs {
    var query: Prisma.ClassFindManyArgs = {
        ...queryClassPreview,
        where: {
            semester: {
                year: data.year,
                season: data.season,
            },
        },
    };
    if (data.teacher) {
        query.where!.teacher = {
            username: data.teacher
        };
    }
    // ... add more where clauses
    return query;
}

const router = Router()

router.post('/', [parseJson, validateForm(form)], async (req: Request, res: Response) => {
    // get json from request body
    const data = req.body as Form;
    // get query from data
    const query = getQuery(data);
    // get classes from query
    res.json(await prisma.class.findMany(query));
})

export default router;
