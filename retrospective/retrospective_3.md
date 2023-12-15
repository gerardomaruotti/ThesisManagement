TEMPLATE FOR RETROSPECTIVE (Team 18)
=====================================

- [process measures](#process-measures)
- [quality measures](#quality-measures)
- [general assessment](#assessment)

## PROCESS MEASURES 

### Macro statistics

- Number of stories committed vs. done
  <br>Stories committed: 6 
  <br>Stories done: 6
- Total points committed vs. done
  <br>Points committed: 38
  <br>Points done: 38
- Nr of hours planned vs. spent (as a team)
  <br>Hours planned: 113h 15m
  <br>Hours spent: 115h 30m

 ### Definition of Done
 
- Unit Tests passing
- Code review completed
- Code present on VCS
- End-to-End tests performed
- Documentation completed
 

### Detailed statistics

| Story  | # Tasks | Points | Hours est. | Hours actual |
|--------|---------|--------|------------|--------------|
| #0 Cross-functional Tasks  |   14   |   -   |    61h 15m        |    66h 50m      |  
| #9 Notify Application Decision  |    5     |    8   |        8h 00m    |      6h 15m        | 
| #10 Delete Proposal     |   5      |    3    |    8h 30m        |       8h 45m       |
| #11 Copy Proposal      |    3     |    3    |   4h 30m      |      4h 00m        |
| #12 Archive Proposal      |    5     |    3    |    8h 00m      |        10h 40m      |
| #13 Access applicant CV      |    6     |    13    |   15h 00m     |    12h 45m          |
| #14  Notifty Application      |    5     |    8    |   8h 00m      |     6h 15m         |


<br><br>
- Hours per task average, standard deviation (estimate and actual) 
<br>Hours per task average (estimate) = 2h 38m
<br>Hours per task average (actual) =  2h 40m
<br>Standard deviation (estimate) = 2.69
<br>Standard deviation (actual) = 2.84

- Total task estimation error ratio: 1- sum of total hours estimation / sum of total hours spent = 0.02 => 2%

  
## QUALITY MEASURES 

- Unit Testing:
  - Total hours estimated: 7h
  - Total hours spent: 5h 30m
  - Nr of automated unit test cases: 96
  - Coverage (if available): 97% statement coverage
- E2E testing:
  - Total hours estimated: 7h
  - Total hours spent: 4h 45m
- Code review 
  - Total hours estimated: 7h
  - Total hours spent: 6h 20m
- Technical Dept management:
  - Total hours estimated: 
  - Total hours spent:
  - Hours estimated for remediation by SonarQube: 4h 4m
  - Hours estimated for remediation by SonarQube only for the selected and planned issues
  - Hours spent on remediation: 15h 45m
  - Hours estimated on remediation: 10h 30m  (!)
  - Debt ratio: 0.3 %
  - ratio for each quality characteristic report in SonarQube under "Measures":
    - Reliability: A
    - Security: A
    - Mainteinability: A

  


## ASSESSMENT

- What caused your errors in estimation (if any)?
  > Our estimation errors were caused by the fact that we worked to implement solutions such as the mail service and curriculum management, which we initially were not familiar with. Additionally, the remediation of technical debt took more time than anticipated. Finally, we decided to invest more hours to increase our coverage by implementing integration tests.

- What lessons did you learn (both positive and negative) in this sprint?
  > Neglecting some best practices during programming led us to address technical debt in this sprint, taking much more time than it would have if we had intervened earlier. We also observed that maintaining high code quality, avoiding duplicated code, and addressing code smells allowed us to work more efficiently in collaboration.

- Which improvement goals set in the previous retrospective were you able to achieve? 
  > We managed to engage a part of the team more actively in the demo related to this sprint, both by presenting the work done and by asking questions as stakeholders.

- Which ones you were not able to achieve? Why?

  > Despite active participation from a portion of the team in the demo, some of us couldn't join as we wanted to avoid dividing the presentation workload among too many members, which could have made the presentation chaotic.

- Improvement goals for the next sprint and how to achieve them (technical tasks, team coordination, etc.)

  > 1. We want everyone to be able to actively participate in the upcoming demos and retrospectives, presenting the work done.
  > 2. We want to increase our coverage through integration tests.

- One thing you are proud of as a Team!!
  > We are proud that Professor Vetrò appreciated our work so much that he "couldn't find any errors".
