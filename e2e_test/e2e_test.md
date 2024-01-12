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

### [9] Notify Application Decision

In this section, we have verified that a student receive a notification when his applications get rejected or accepted.

#### Test 1
Steps:
1. Login as a teacher
2. Click on `Applications` in the navbar, in the top left corner.
3. Click on `Pending`.
4. Click on `Show applications` of the first thesis.
5. Click on the accept button in the status column.
6. Login in Politecnico mail server as the student that has sent the application.
7. Ensure that he has received the confirmation email.

#### Test 2
Steps:
1. Login as a teacher
2. Click on `Applications` in the navbar, in the top left corner.
3. Click on `Pending`.
4. Click on `Show applications` of the first thesis.
5. Click on the reject button in the status column.
6. Login in Politecnico mail server as the student that has sent the application.
7. Ensure that he has received the rejection email.

### [10] Delete Proposal

In this section, we have verified that a teacher can delete his proposal.

#### Test 1
Steps:
1. Login as a teacher.
2. Click on the delete button of the first thesis proposal.
3. Confirm the operation.
4. Ensure that the deleted proposal is no more on the screen.

#### Test 2
Steps:
1. Login as a teacher.
2. Click on `Archived`, in the top left corner.
2. Click on the delete button of an assigned thesis proposal.
3. Ensure that the delete button is disabled.

### [11] Copy Proposal

In this section, we have verified that a teacher can copy his proposal so he can create a new proposal from an existing one.

#### Test 1
Steps:
1. Login as a teacher.
2. Click on the copy button of the first thesis proposal.
3. Click on the `+` in the bottom righ corner for inserting a new proposal.
4. Click on `Paste`.
5. Ensure that inserted info are the same as the copied proposal.

#### Test 2
Steps:
1. Login as a teacher.
3. Click on the `+` in the bottom righ corner for inserting a new proposal.
4. Ensure that the `Paste` button is not dsplayed.

#### Test 3
Steps:
1. Login as a teacher.
2. Click on `Archived`, in the top left corner.
3. Click on the copy button of the first thesis proposal.
4. Click on the `+` in the bottom righ corner for inserting a new proposal.
5. Click on `Paste`.
6. Ensure that inserted info are the same as the copied proposal.

### [12] Archive Proposal

In this section, we have verified that a teacher can archive his proposal.

#### Test 1
Steps:
1. Login as a teacher.
2. Click on the archive button of the first thesis proposal.
3. Confirm the operation.
4. Ensure that the archived proposal is no more on the screen.
5. Click on `Archived`, in the top left corner.
6. Ensure that the archived thesis is present.

#### Test 2
Steps:
1. Login as a teacher.
2. Click on `Archived`, in the top left corner.
3. Click on the archive button of an assigned thesis proposal.
4. Ensure that the archive button is disabled.

### [13] Access Appliant CV

In this section, we have verified that the teacher can access appliant cv.

#### Test 1
Steps:
1. Login as a teacher.
2. Click on `Applications` in the navbar, in the top left corner.
3. Click on `Pending`.
4. Click on the first application of the list.
5. Click on the cv button in the student detail column.
6. Ensure that it is displayed correctly if present.

### [14] Notify Application Decision

In this section, we have verified that a teacher receive a notification when his thesis get an application.

#### Test 1
Steps:
1. Login as a student.
2. Ensure that the proposals displayed are related to my Cds.
3. Click `Apply` on the first proposal in the list.
4. Ensure that a green popup with the text 'Application successful' is displayed on the screen.
6. Login in Politecnico mail server as the teacher of the thesis.
7. Ensure that he has received the confirmation email.

### [14] Insert student request

In this section, we have verified that a student can request a thesis.

#### Test 1
Steps:
1. Login as a student.
2. Go to `Request` tab
2. Ensure that I don't have previous request
3. Click `Submit` without inserting nothing.
4. Ensure that request is not sent and it require mandatory information.
6. Login in Politecnico mail server as the teacher of the thesis.
7. Ensure that he has received the confirmation email.
