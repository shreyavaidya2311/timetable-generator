from fastapi import FastAPI, HTTPException
import motor.motor_asyncio

client = motor.motor_asyncio.AsyncIOMotorClient('mongodb://localhost:27017/timetable')
database = client.timetable
courses_collection = database.courses

from model import Course

from fastapi.middleware.cors import CORSMiddleware
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

@app.get("/get-courses")
async def get_todo():
    courses = []
    cursor = courses_collection.find({})
    async for document in cursor:
        courses.append(Course(document))
    return courses


@app.post("/add-course", response_model=Course)
async def post_todo(course: Course):
    document = course.dict()
    result = await courses_collection.insert_one(document)
    return document


# @app.put("/api/todo/{title}/", response_model=Todo)
# async def put_todo(title: str, desc: str):
#     response = await update_todo(title, desc)
#     if response:
#         return response
#     raise HTTPException(404, f"There is no todo with the title {title}")

# @app.delete("/api/todo/{title}")
# async def delete_todo(title):
#     response = await remove_todo(title)
#     if response:
#         return "Successfully deleted todo"
#     raise HTTPException(404, f"There is no todo with the title {title}")
