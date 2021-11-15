from pydantic import BaseModel

class Course(BaseModel):
    name: str
    lectureno: int
    duration: int
    instructor_name: str
    start_hr: str
    end_hr: str