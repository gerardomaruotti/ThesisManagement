# End 2 End testing

## Tests for Stories

### [1] Insert Proposal

In this section, we have verified that the submission of a thesis proposal occurs correctly.

#### Test 1
Steps:
1. Login as a teacher
2. Click on the bottom containing the `+` at the bottom right of the screen.
3. Ensure that the submission does not occur until all mandatory fields have been filled in.
4. Insert at least: one co-supervisor, one keyword and one type between the ones already present in the database and then creating a new keyword and type.
5. Click `Insert Proposal`.
6. Ensure that the thesis proposal created is now present on screen.
7. Look if it contains correct data.

#### Test 2
Steps:
1. Login as a teacher
2. Click on the bottom containing the `+` at the bottom right of the screen.
3. Ensure that the submission does not occur until all mandatory fields have been filled in.
4. Insert at least: one co-supervisor, one keyword and one type between the ones already present in the database and then creating a new keyword and type.
5. Click `Cancel`.
6. Ensure that the thesis proposal is not present on screen.

### [2] Search Proposal

In this section, we have verified that the proposals are displayed correctly, even filtering on every field of the proposal.

#### Test 1
Steps:
1. Login as a student
2. Ensure that the proposals displayed are related to my Cds.
3. Click on the first proposal of the list.
4. Ensure that it is displayed correctly with all the information on screen.

#### Test 2
Steps:
1. Login as a student
2. Ensure that the proposals displayed are related to my Cds.
3. Click on `In Company`.
4. Ensure that the thesis proposals displayed contains this Type.
3. Click on `Abroad`.
4. Ensure that the thesis proposals displayed contains this Type.

#### Test 3
Steps:
1. Login as a student
2. Ensure that the proposals displayed are related to my Cds.
3. Write "Theory" in the searchbar
4. Ensure that the proposals displayed contains the word "Theory" in title, description, required knowledge or notes fields.

#### Test 4
Steps:
1. Login as a student
2. Ensure that the proposals displayed are related to my Cds.
3. Click the filter icon.
4. Apply some filters.
5. Ensure that the proposals displayed have been filtered correclty.


### [3] Apply for Proposal

In this section, we have verified that the application of a thesis proposal occurs correctly..

#### Test 1
Steps:
1. Login as a student
2. Ensure that the proposals displayed are related to my Cds.
3. Click `Apply` on the first proposal in the list.
4. Ensure that a green popup with the text 'Application successful' is displayed on the screen.
5. Click again on `Apply` on the first proposal in the list.
6. Ensure that a red popup with the text 'Application failed' is displayed on the screen.
