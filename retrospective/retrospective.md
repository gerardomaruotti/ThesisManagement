TEMPLATE FOR RETROSPECTIVE (Team 18)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  <br>Stories committed: 3
  <br>Stories done: 3
- Total points committed vs. done
  <br>Points committed: 18
  <br>Points done: 18
- Nr of hours planned vs. spent (as a team)
  <br>Hours planned: 115h
  <br>Hours spent: 118h

**Remember** a story is done ONLY if it fits the Definition of Done:
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed
- Documentation completed


> Please refine your DoD if required (you cannot remove items!) 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| #0    |      8   |    5   |    11h 10m        |     11h 40m         | 
|    | #0 E2E test | --- | 1h | 1h 30m |
|    | #1 Unit test | --- | 30m | 3h 30m |
|    | #2 Insert API checks | --- | 1h | 0h |
|    | #3 frontend link to API | --- | 1h 30 | 2h |
|    | #4 update documentation | --- | 10m | 10m |
|    | #5 design form | --- | 2h | 1h |
|    | #6 insert frontend form | --- | 3h | 0h |
|    | #7 insert api | --- | 2h | 3h 30m |
| #1 Search Proposal     |   13      |    8    |     16h 50m       |      26h 45m        |
|    | #0 Get detailed info api  | --- | 1h | 4h 20m |
|    | #1 Get api checks | --- | 1h | 1h |
|    | #2 frontend design detailed info thesis | --- | 2h | 2h |
|    | #3 get api | --- | 2h | 7h 15m |
|    | #4 get teacher | --- | 30m | 0h |
|    | #5 front end search | --- | 2h | 3h 30m |
|    | #6 e2e test | --- | 1h | 0h |
|    | #7 design search field | --- | 2h | 2h |
|    | #8 Update documentation | --- | 20m | 10m |
|    | #9 unit test | --- | 1h | 5h |
|    | #10 get keywords | --- | 30m | 0h |
|    | #11 frontend implementation thesis details | --- | 2h | 1h |
|    | #12 front end link to api | --- | 1h 30m | 30m |
| #2 Apply for proposal      |   6      |    5    |     6h 40m      |      4h 35m        |
|    | #0 e2e test | --- | 1h | 0h |
|    | #1 unit test | --- | 30m | 30m |
|    | #2 front end link to api | --- | 1h | 0h |
|    | #3 insert api | --- | 2h | 2h |
|    | #4 Update documentation | --- | 10m | 5m |
|    | #5 api checks | --- | 2h | 2h |
   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
<br><br> - Story #0: 
<br>Hours per task average (estimate) = 1h 23m
<br>Hours per task average (actual) = 1h 27m
<br>Standard deviation (estimate) = 0.63h
<br>Standard deviation (actual) = 1.2h
<br><br> - Story #1: 
<br>Hours per task average (estimate) = 1h 10m
<br>Hours per task average (actual) = 1h 57m
<br>Standard deviation (estimate) = 0.47h
<br>Standard deviation (actual) = 0.87h
<br><br>- General: 
<br>Hours per task average (estimate) = 1h 27m
<br>Hours per task average (actual) = 2h 15m
<br>Standard deviation (estimate) = 0.62h
<br>Standard deviation (actual) = 1.09h

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
<br><br> - Task #0: -0.31 
<br><br> - Task #1: -0.4
<br><br> - General: -0.35

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 2h 
  - Total hours spent: 9h
  - Nr of automated unit test cases: 47
  - Coverage (if available): 90% statement coverage
- E2E testing:
  - Total hours estimated: 3h 
  - Total hours spent: 1h 30m
- Code review 
  - Total hours estimated: 2h
  - Total hours spent: 1h
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
> Initially, we tried to estimate fewer hours, considering the possibility of encountering issues or making incorrect estimates. We underestimated the frontend development, which took more hours than expected due to several ongoing changes. Managing the APIs also took more time than anticipated because the need arose to create additional APIs that were not initially planned, or to modify the database. Lastly, we spent a lot of time in learning phase and trying to implement the external authentication.

- What lessons did you learn (both positive and negative) in this sprint?
>We have learned greater adaptability in responding to needs from other team members. We used Github in a more efficient way, raising issues in order to avoid conflicts. Better comunication between team members improved less errors and time wasted.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  We improve our comunication, sharing some core task management in order to reach an agreement.

- Which ones you were not able to achieve? Why?
  We planned again badly, we spent so much time in estimation and we did many mistakes, we understimated some tasks and we overrated others, in the end the former required a large amount of time to be implemented and the latter were much easier.
- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > 1) Better initial planning.
  > 2) Work even better on GitHub

- One thing you are proud of as a Team!!
<br>Great adaptability and excellent teamwork.
