# End 2 End testing

## Test for Virtual Clock

In this section, we have verified that the virtual clock work correctly.

#### Test 1
Steps:
1. Login.
2. Click on the name on the top right corner.
3. Click on the `setting` buttons.
4. Enable virtual clock.
5. Insert a valid date value.
6. Ensure that the modify has effect on.


## Tests for Stories

### [1] Insert Proposal

In this section, we have verified that the submission of a thesis proposal occurs correctly.

#### Test 1
Steps:
1. Login as a teacher.
2. Click on the bottom containing the `+` at the bottom right of the screen.
3. Ensure that the submission does not occur until all mandatory fields have been filled in.
4. Insert at least: one co-supervisor, one keyword and one type between the ones already present in the database and then creating a new keyword and type.
5. Click `Insert Proposal`.
6. Ensure that the created thesis proposal is now present on screen.
7. Look if it contains correct data.

#### Test 2
Steps:
1. Login as a teacher.
2. Click on the bottom containing the `+` at the bottom right of the screen.
3. Ensure that the submission does not occur until all mandatory fields have been filled in.
4. Insert at least: one co-supervisor, one keyword and one type between the ones already present in the database and then creating a new keyword and type.
5. Click `Cancel`.
6. Ensure that the thesis proposal is not present on screen.

### [2] Search Proposal

In this section, we have verified that the proposals are displayed correctly, even filtering on every field of the proposal.

#### Test 1
Steps:
1. Login as a student.
2. Ensure that the proposals displayed are related to my Cds.
3. Click on the first proposal of the list.
4. Ensure that it is displayed correctly with all the information on screen.

#### Test 2
Steps:
1. Login as a student.
2. Ensure that the proposals displayed are related to my Cds.
3. Click on `In Company`.
4. Ensure that the thesis proposals displayed contains this Type.
3. Click on `Abroad`.
4. Ensure that the thesis proposals displayed contains this Type.

#### Test 3
Steps:
1. Login as a student.
2. Ensure that the proposals displayed are related to my Cds.
3. Write "Theory" in the searchbar
4. Ensure that the proposals displayed contains the word "Theory" in title, description, required knowledge or notes fields.

#### Test 4
Steps:
1. Login as a student.
2. Ensure that the proposals displayed are related to my Cds.
3. Click the filter icon.
4. Apply some filters.
5. Ensure that the proposals displayed have been filtered correclty.


### [3] Apply for Proposal

In this section, we have verified that the application of a thesis proposal occurs correctly.

#### Test 1
Steps:
1. Login as a student.
2. Ensure that the proposals displayed are related to my Cds.
3. Click `Apply` on the first proposal in the list.
4. Ensure that a green popup with the text 'Application successful' is displayed on the screen.
5. Click again on `Apply` on the first proposal in the list.
6. Ensure that a red popup with the text 'Application failed' is displayed on the screen.


### [4] Browse Applications

In this section, we have verified that the teacher can browse appliations to his thesis.

#### Test 1
Steps:
1. Login as a teacher.
2. Click on `Applications` in the navbar, in the top left corner.
3. Click on the first application of the list.
4. Ensure that it is displayed correctly with all the information on screen.

#### Test 2
Steps:
1. Login as a teacher.
2. Click on `Applications` in the navbar, in the top left corner.
3. Click on `Pending`. 
4. Ensure that the applications displayed are all with this status.
5. Click on `Assigned`. 
6. Ensure that the applications displayed are all with this status.
7. Click on `Expired`.
8. Ensure that the applications displayed are all with this status.


### [5] Accept Applications

In this section, we have verified that the teacher can accept and reject appliations to his thesis.

#### Test 1
Steps:
1. Login as a teacher.
2. Click on `Applications` in the navbar, in the top left corner.
3. Click on `Pending`.
4. Click on the first application of the list.
5. Ensure that it is displayed correctly with all the information on screen.

#### Test 2
Steps:
1. Login as a teacher.
2. Click on `Applications` in the navbar, in the top left corner.
3. Click on `Pending`.
4. Click on `Show applications` of the first thesis.
5. Click on the reject button in the status column.
6. Confirm the operation.

#### Test 3
Steps:
1. Login as a teacher
2. Click on `Applications` in the navbar, in the top left corner.
3. Click on `Pending`.
4. Click on `Show applications` of the first thesis.
5. Click on the accept button in the status column.
6. Confirm the operation.
7. Ensure that the status of the application is now Assigned.


### [6] Browse Applications Decision

In this section, we have verified that a student can browse his appliations decision.

#### Test 1
Steps:
1. Login as a student.
2. Click on `Applications` in the navbar, in the top left corner.


### [7] Browse Proposal

In this section, we have verified that a student can browse his appliations decision.

#### Test 1
Steps:
1. Login as a teacher.
2. Ensure that all proposal displayed are mine.


### [8] Update Proposal

In this section, we have verified that a teacher can update his proposal.

#### Test 1
Steps:
1. Login as a teacher.
2. Click on the edit button of the first thesis proposal.
3. Ensure that the submission does not occur until all mandatory fields have been filled in.
4. Insert at least: one co-supervisor, one keyword and one type between the ones already present in the database and then creating a new keyword and type.
5. Click `Edit Proposal`.
6. Ensure that the edited thesis proposal is now present on screen.
7. Look if it contains correct updated data.

#### Test 2
Steps:
1. Login as a teacher.
2. Click on the edit button of the first thesis proposal.
3. Ensure that the submission does not occur until all mandatory fields have been filled in.
4. Insert at least: one co-supervisor, one keyword and one type between the ones already present in the database and then creating a new keyword and type.
5. Click `Cancel`.
6. Ensure that the thesis proposal is not present on screen.
