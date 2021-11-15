from typing import List
from pydantic import BaseModel, Field
from bson import ObjectId


class PyObjectId(ObjectId):
    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        if not ObjectId.is_valid(v):
            raise ValueError("Invalid objectid")
        return ObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema):
        field_schema.update(type="string")


class CreateCourse(BaseModel):
    name: str
    lectureno: int
    duration: int
    instructor_name: str
    start_hr: str
    end_hr: str


class Course(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    name: str
    lectureno: int
    duration: int
    instructor_name: str
    start_hr: str
    end_hr: str

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class WorkingDay(BaseModel):
    day: str
    start_hr: str
    end_hr: str
    total_hours: str


class CreateConstraint(BaseModel):
    working_days: List[WorkingDay]
    consecutive_subjects: List[str]
    non_consecutive_subjects: List[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}


class Constraint(BaseModel):
    id: PyObjectId = Field(default_factory=PyObjectId, alias="_id")
    working_days: List[WorkingDay]
    consecutive_subjects: List[str]
    non_consecutive_subjects: List[str]

    class Config:
        allow_population_by_field_name = True
        arbitrary_types_allowed = True
        json_encoders = {ObjectId: str}
