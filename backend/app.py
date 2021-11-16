from fastapi.middleware.cors import CORSMiddleware
from starlette.responses import HTMLResponse
from csp import generate
from model import Constraint, Course, CreateConstraint, CreateCourse
from fastapi import FastAPI
import motor.motor_asyncio
import uvicorn

client = motor.motor_asyncio.AsyncIOMotorClient(
    'mongodb://localhost:27017/timetable')
database = client.timetable
courses_collection = database.courses
constraints_collection = database.constraints

app = FastAPI()

origins = [
    "http://localhost:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

if __name__ == '__main__':
    uvicorn.run("app:app", host="localhost",
                port=8000, reload=True, debug=True)


@app.get("/get-courses")
async def get_courses():
    courses = []
    cursor = courses_collection.find({})
    async for document in cursor:
        courses.append(Course(**document))
    return courses


@app.get("/get-constraints")
async def get_constraints():
    constraints = []
    cursor = constraints_collection.find({})
    async for document in cursor:
        constraints.append(Constraint(**document))
    return constraints


@app.post("/add-course", response_model=Course)
async def post_course(course: CreateCourse):
    document = course.dict()
    await courses_collection.insert_one(document)
    return document


@app.post("/add-constraints", response_model=Constraint)
async def post_constraints(constraint: CreateConstraint):
    document = constraint.dict()
    await constraints_collection.insert_one(document)
    return document


@app.get("/generate-timetable")
async def generate_timetable():
    constraints = []
    cursor = constraints_collection.find({})
    async for document in cursor:
        constraints.append(Constraint(**document))

    courses = []
    cursor = courses_collection.find({})
    async for document in cursor:
        courses.append(Course(**document))

    if constraints == [] or courses == []:
        return HTMLResponse(status_code=400)

    courses = [item.dict() for item in courses]

    data = generate(constraints[-1].dict(), courses)
    return data
