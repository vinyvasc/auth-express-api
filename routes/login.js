const express = require('express')
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const router = express.Router()

/**
 * @swagger
 * /login:
 *      post:
 *          summary: User login service
 *          requestBody:
 *               required: true
 *               content:
 *                   application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              username:
 *                                  type: string
 *                              password:
 *                                  type: string
 *          responses:
 *              '200':
 *                  description: Success
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: object
 *                              properties:
 *                                  username:
 *                                      type: string
 *                                  token:
 *                                      type: string
 *              '400':
 *                  description: Bad Request
 *              '404':
 *                  description: Not found
 *                  
 */
router.post("/", async (req, res) => {
    try {
        const user = await User.findOne({
            attributes: [
            'id','username','password'
            ],
            where: { username: req.body.username }
        })
        
        if (!user)
            return res.status(404).send({ message: 'user not found' })
        else if(
            req.body.username == user.username && 
            req.body.password !== user.password
        )
            return res.status(400).send({ message: 'wrong password' })

        console.log(user.dataValues)
        const payload = {
            username: user.username,
            password: user.password
        }

        const token = jwt.sign(payload, process.env.TOKEN_SECRET, { expiresIn: '24h' })

        res.status(200).send({
            id: user.id,
            username: user.username,
            token: token
        })

    } catch (error) {
        console.log(error)
        return res.status(500).send({ message: 'internal server error'})
    }
    
})

module.exports = router