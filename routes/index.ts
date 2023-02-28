import { Router } from "express";
const router = Router();

router.use('/login', require('./login'))

// ... other routes

export = router
