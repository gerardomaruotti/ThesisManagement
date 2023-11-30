TEMPLATE FOR RETROSPECTIVE (Team 18)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  <br>Stories committed: 5
  <br>Stories done: 5
- Total points committed vs. done
  <br>Points committed: 37
  <br>Points done: 37
- Nr of hours planned vs. spent (as a team)
  <br>Hours planned: 114h 30m
  <br>Hours spent: 113h 10m

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
| #3 Browse Application  |    6     |    3   |    14h        |     12h 35m         | 
|    | #0 E2E test | --- | 2h | 1h 45m |
|    | #1 Unit test | --- | 2h | 1h 20m |
|    | #2 frontend implementation | --- | 3h | 3h |
|    | #3 frontend link to API | --- | 2h | 2h |
|    | #4 design layout | --- | 2h | 2h 30m |
|    | #5 get application API | --- | 3h | 2h |
| #4 Accept Application     |   5      |    13    |     11h 30m       |      9h 55m        |
|    | #0 Accept API  | --- | 3h 30m | 3h 30m |
|    | #1 frontend implementation | --- | 1h | 1h |
|    | #2 frontend link to API | --- | 2h | 1h 40m |
|    | #3 unit test | --- | 2h | 2h |
|    | #4 e2e test | --- | 3h | 1h 45m |
| #5 Browse Application Decisions      |    7     |    3    |     17h      |      15h 25m        |
|    | #0 decisions API | --- | 3h | 2h 15m |
|    | #1 design layout | --- | 2h | 2h 30m |
|    | #2 frontend implementation | --- | 3h | 3h 30m |
|    | #3 frontend link to api | --- | 2h | 1h 50m |
|    | #4 get user info API | --- | 3h | 1h 45m |
|    | #5 unit test | --- | 2h | 1h 50m |
|    | #6 e2e test | --- | 2h | 1h 45m |
| #6 Browse Proposals      |    5     |    5    |     11h      |      9h 30m        |
|    | #0 GET Active Thesis API | --- | 4h | 3h |
|    | #1 frontend link API | --- | 2h | 1h 45m |
|    | #2 frontend implementation | --- | 1h | 1h |
|    | #3 unit test | --- | 2h | 2h |
|    | #4 e2e test | --- | 2h | 1h 45m |
| #7 Update Proposals      |    5     |    13    |    15h 30m      |     15h         |
|    | #0 Update Proposal API | --- | 6h | 5h 55m |
|    | #1 frontend implementation | --- | 3h | 3h 20m |
|    | #2 frontend link to API | --- | 2h 30m | 2h |
|    | #3 unit test | --- | 2h | 2h |
|    | #4 e2e test | --- | 2h | 1h 45m |
   

> place technical tasks corresponding to story `#0` and leave out story points (not applicable in this case)

- Hours per task average, standard deviation (estimate and actual)
<br><br> - Story #3: 
<br>Hours per task average (estimate) = 2.33h
<br>Hours per task average (actual) = 2.09h
<br>Standard deviation (estimate) = 0.22h
<br>Standard deviation (actual) = 0.28h
<br><br> - Story #4: 
<br>Hours per task average (estimate) = 2.3h
<br>Hours per task average (actual) = 1.98h
<br>Standard deviation (estimate) = 0.76h
<br>Standard deviation (actual) = 0.68h
<br><br> - Story #5: 
<br>Hours per task average (estimate) = 2.42h
<br>Hours per task average (actual) = 2.19h
<br>Standard deviation (estimate) = 0.24h
<br>Standard deviation (actual) = 0.35h
<br><br> - Story #6: 
<br>Hours per task average (estimate) = 2.2h
<br>Hours per task average (actual) = 1.9h
<br>Standard deviation (estimate) = 0.96h
<br>Standard deviation (actual) = 0.41h
<br><br> - Story #7: 
<br>Hours per task average (estimate) = 3.1h
<br>Hours per task average (actual) = 3h
<br>Standard deviation (estimate) = 2.24h
<br>Standard deviation (actual) = 2.43h
<br><br>- General: 
<br>Hours per task average (estimate) = 2.44h
<br>Hours per task average (actual) = 2.25m
<br>Standard deviation (estimate) = 0.91h
<br>Standard deviation (actual) = 0.93h

- Total task estimation error ratio: sum of total hours estimation / sum of total hours spent - 1
<br><br> - Task #3: 0.11 
<br><br> - Task #4: 0.15
<br><br> - Task #5: 0.10
<br><br> - Task #6: 0.15 
<br><br> - Task #7: 0.03
<br><br> - General: 0.10

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 10h 
  - Total hours spent: 9h 30m
  - Nr of automated unit test cases: 68 (new), 115(total)
  - Coverage (if available): 96% statement coverage
- E2E testing:
  - Total hours estimated: 11h
  - Total hours spent: 8h 45m
- Code review 
  - Total hours estimated: 5h
  - Total hours spent: 7h 5m
  


## ASSESSMENT

- What caused your errors in estimation (if any)?
> The main error encountered during the planning phase stemmed from the fact that we underestimated the time required for learning, necessary to effectively complete certain tasks. 

- What lessons did you learn (both positive and negative) in this sprint?
> A good initial plan significantly facilitates the progress of work. Working within a broader time frame, for example, not limiting ourselves to completing tasks in the last days before the demo, has led to an increased flexibility and a better response to errors.

- Which improvement goals set in the previous retrospective were you able to achieve? 
> We definitely made a better plan compared to last time, relying on the individual experience of each group member, we managed to identify issues and balanced the sprint accordingly. We emphasized working better by using GitHub, opening many issues even for small changes. Finally, we worked by distributing the workload more evenly during the sprint period, allowing us to reach the last days before the demo with a completed project ready to be tested end-to-end.

- Which ones you were not able to achieve? Why?

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > 1) 
  > 2) 

- One thing you are proud of as a Team!!
<br>. We have accomplished what we set out to improve.
