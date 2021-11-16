## Time Table Generator

_Time Table Generator_ is a dynamic system that schedules the slots and the teachers for a particular subject and day according to given constraints by the user.
This has been done by modelling a Constraint Satisfaction Problem with the inputs and constraints given by the user and outputting a valid timetable that adheres to all constraints.

## About the Constraint Satisfaction Problem

- **Variables**: Set of available time-slots
- **Domain**: Set of all subjects available for scheduling

### Constraints Implemented
- No clash in timings between 2 subjects
- Subjects that have more than 1 hour per lecture scheduled together
- Teachers working hours considered
- Two subjects can be scheduled to be non-consecutive 

## Input taken from user

- **Course Details**
  1. Name of course
  2. Name of instructor
  3. Lectures per week
  4. Duration of one lecture/lab
  5. Working hours of instructor

- **Overall Constraints**
  1. Working hours
  2. Working days
  3. Two subjects which cannot be scheduled consecutively

## Tech Stack

<img width="650px" src="https://user-images.githubusercontent.com/56782318/141955813-15e0340d-72a6-4a49-afd0-40513cba9673.png"/>

## Screenshots

<img width="900px" src="https://user-images.githubusercontent.com/56782318/141957853-b9f67c46-2327-4c65-bd6b-288707c9917f.png"/>
<img width="900px" src="https://user-images.githubusercontent.com/56782318/141957891-8aa7cd5f-62b9-4680-a312-59307e184a4f.png"/>
<img width="900px" src="https://user-images.githubusercontent.com/56782318/141958163-f2654097-9f44-4a5a-a311-3e48e77b168d.png"/>


## Installation

1. Clone the repository
```
git clone https://github.com/shreyavaidya2311/timetable-generator.git
```

2. Installing dependencies
```
npm i
cd backend & pip3 install -r requirements.txt
```

3. Run the frontend (http://localhost:3000/)
```
npm start
```

4. Run the backend
```
cd backend
python3 app.py
```

## Contributors

- <a href="https://github.com/shreyavaidya2311">Shreya Vaidya</a>
- <a href="https://github.com/sameerkavthekar">Sameer Kavthekar</a>

