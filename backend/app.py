from fastapi.middleware.cors import CORSMiddleware
from model import Course
from fastapi import FastAPI, HTTPException
import motor.motor_asyncio
import uvicorn

client = motor.motor_asyncio.AsyncIOMotorClient(
    'mongodb://localhost:27017/timetable')
database = client.timetable
courses_collection = database.courses

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
async def get_todo():
    courses = []
    cursor = courses_collection.find({})
    async for document in cursor:
        courses.append(Course(**document))
    return courses


@app.post("/add-course", response_model=Course)
async def post_todo(course: Course):
    document = course.dict()
    result = await courses_collection.insert_one(document)
    return document
