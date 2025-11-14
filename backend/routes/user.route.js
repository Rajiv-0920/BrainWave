import express from 'express'
import { verifyToken } from '../lib/utils.js'
import { getUserDetails } from '../controller/user.controller.js'

const router = express.Router()

router.get('/', verifyToken, getUserDetails)

export default router
