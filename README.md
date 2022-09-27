# Project's name REST API
## Description

This is a the backend repository for the React application `app's name`.

---

## Instructions

When cloning the project, change the <code>sample.env</code> file name for <code>.env</code>. The project will run on **PORT 8000**.

Then, run:
```bash
npm install
```
## Scripts

- To start the project run:
```bash
npm run start
```
- To start the project in development mode, run:
```bash
npm run dev
```
- To seed the database, run:
```bash
npm run seed
```
---

## Models

### User

Users in the database have the following properties:

```js
{
  "username": String,
  "email": String,
  "hashedPassword": String
  "imageUrl: String
}
```

---

## API endpoints and usage 

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| SIGN UP user     | POST      | /api/v1/auth/signup  | { username, email, password, imageUrl }   |    Public |                 
| LOG IN user      | POST      | /api/v1/auth/login   | { email, password }             |    Public |                  
| GET logged in user   | GET     | /api/v1/auth/me    |   | Private |

---

| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| GET TRAININGS   | GET     | /api/v1/training |   |    Private |                 
| CREATE TRAININGS user      | POST      | /api/v1/training/create   | { name, imageUrl, date, category }  |    Private |                  
| GET ADD USER IN TRAINING   | GET     | /api/v1/training/addUser/:id   |   | Private |
| GET DELETE USER IN TRAINING  | GET   | /api/v1/training/deleteUser/:id  | |    Private |                 
| UPDATE TRAINING     | PUT   | /api/v1/training/:id  | { email, password }             |    Private |                  
| DELETE TRAINING   | DELETE   | /api/v1/training/:id    |   | Private |


| Action           | Method    | Endpoint             | Req.body                        | Private/Public |
|------------------|-----------|----------------------|---------------------------------|-----------------|
| GET EVENTS   | GET     | /api/v1/training |   |    Private |                 
| CREATE EVENTS      | POST      | /api/v1/event/create   | { name, imageUrl, date,  }  |    Private |                  
| GET ADD USER IN AN EVENT   | GET     | /api/v1/event/addUser/:id   |   | Private |
| GET DELETE USER IN AN EVENT | GET   | /api/v1/event/deleteUser/:id  | |    Private |                 
| UPDATE EVENT    | PUT   | /api/v1/event/:id  | { email, password }             |    Private |                  
| DELETE EVENT   | DELETE   | /api/v1/event/:id    |   | Private |

## Useful links

- [https://slides.com/josepcortes/minimal/edit]()
- [https://github.com/josepCortesManyanich/FINALPROJECTrontend repository]()
- [https://puro-fighters.netlify.app/]()
- [https://dashboard.heroku.com/apps/impacto-training/settings]()

