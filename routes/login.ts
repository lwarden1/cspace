import { Router, Request, Response, NextFunction, RequestHandler } from "express"
import { prisma, queryStudent, queryTeacher } from "../prisma"

const router = Router()

// router.post('/', ...login form handler...)


export = router
