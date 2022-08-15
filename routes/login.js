const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()

const userMock = {
    id: 1,
    username: 'admin',
    password: '123456',
}

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
router.post("/", (req, res) => {
    try {
        const user = { ...userMock }
        if (req.body.username != userMock.username)
            return res.status(404).send({ message: 'user not found' })

        else if(
            req.body.username == user.username && 
            req.body.password !== user.password
        )
            return res.status(400).send({ message: 'wrong password' })

        const token = jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h'})

        delete user.password

        res.send({ ...user, token})

    } catch (error) {
        return res.status(500).send({ message: 'internal server error'})
    }
    
})

module.exports = router