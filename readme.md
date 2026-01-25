authRouter

POST /signup
POST /login
POST /logout

profileRouter

POST /profile/view
PATCH /profile/edit
PATCH /profile/password

connectionRequestRouter

POST /request/send/interested/:userId
POST /request/send/rejected/:userId
POST /request/review/accepted/:requestId
POST /request/review/ignored/:requestId

userRouter

GET /user/connections
GET /user/requests
GET /user/feed

