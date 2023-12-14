const request = require('supertest');
const { app } = require('../index.js');
const dbTest = require('./insert4test.js')
const date = '2024-01-01'

const teacher = {
    id: "d0",
    group: "cod_g0",
    jwt : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdKbkgwVGlRSFdkUHUtMzFRSktTTiJ9.eyJpc3MiOiJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1NTI2MmQzMmQ1OGM0M2M2ODA1YmQwYiIsImF1ZCI6WyJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMjQ4MzQwMywiZXhwIjoxNzAyNTY5ODAzLCJhenAiOiJJZFBrSHRKY280Nkt1T0FnZjFUcDhMakJEUmMwYjJmZyIsInNjb3BlIjoib3BlbmlkIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEifQ.K-kCz8zliCYljlLvQ4pkbNgFxINbuGioWFU3WigaRxX1FGPR3rnjgA06MicRimW0Cp5X2DIWfAInQIZ_BXf1XuAoqzpppJVxH3zYw3UAwgZMdBfZpb72YaE5VOqnsGl2f7A7qydMk0Ro8GhDZZgIrtonpxo2gOe5lJoNBhe2g51a_jLEzD8ezRnEnZv-MFEauISJx2P3BgB526UZ6Jsss5eQ5DgWrkQcFPNuPPApsuvxoCOdeJNUvf-o0gbupZkPM0EWQX6O2RmPnmuqlX43ti4cQ6lptTb6eLZvQ8hhWC_e1g78N5yt3gnyB4LV2eCDiLW6LuiIJ_9tTxnY5XPpLQ'
}

const student = {
    id: "s0",
    degree: "cod_d0",
    jwt : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdKbkgwVGlRSFdkUHUtMzFRSktTTiJ9.eyJpc3MiOiJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1NGNhYTljNTBkZGQwZTAxOTg0ZmU2NCIsImF1ZCI6WyJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwMjQ4MzM1NSwiZXhwIjoxNzAyNTY5NzU1LCJhenAiOiJJZFBrSHRKY280Nkt1T0FnZjFUcDhMakJEUmMwYjJmZyIsInNjb3BlIjoib3BlbmlkIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEifQ.PuVKUkUkeCLSUXCyR54E-t7podq2YHrDV_G6jAHoQOq2J0xN4_vVkLsKE8RBF1_rxDOVpA7or1gBeduAeqCfECouZfZakbNRR3ZRsILdFswSpD1H19x-14YQmwKbpaXVLcUO4GWZC_ROPNzsLSjgG_fT5L2tXd6M0P91TWpL0-YwcZ9prPDYplA46Ilorot3akqik9dUdUvXn8-rO9rU5Mn5AuvUkir9Ja2VpwyT1A-LlxKq5xGY8_RiXQtw5WBXHGD1FA-iMJg6gnAFilU2iJLn8xFv0h3b49H2pJ_YAsSz4EuhpeTLhCSwXwYpEorRrKRU0RtIs7itca7e22MHTw'    
}

beforeAll(async () => {
    await dbTest.createTestDb();
    await dbTest.insertTeacher(0);
    await dbTest.insertStudent(0);
    await dbTest.insertStudentAuth('auth0|654caa9c50ddd0e01984fe64');
    await dbTest.insertTeacherAuth('auth0|655262d32d58c43c6805bd0b');
});

describe('GET Keywords', () => {
    afterAll(async () => {
        await dbTest.deleteTableContent("KEYWORD");
    });

    test('should return a non-empty list when retrieving a list of keywords', async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(dbTest.insertKeyword(i));
        }

        await Promise.all(insertPromises);

        const res = await request(app).get('/api/keywords').set('Authorization', `Bearer ${student.jwt}`);
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(expect.arrayContaining(["keyword0", "keyword1", "keyword2"]));
    });
});

describe('GET Types', () => {
    afterAll(async () => {
        await dbTest.deleteTableContent("TYPE");
    });
    test('should return a non-empty list when retrieving a list of types', async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(dbTest.insertType(i));
        }

        await Promise.all(insertPromises);

        const res = await request(app).get('/api/types').set('Authorization', `Bearer ${student.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(expect.arrayContaining(["type0", "type1", "type2"]));
    });
});

describe('GET Teachers', () => {
    test('should return a non-empty list when retrieving a list of teachers', async () => {
        const insertPromises = [];
        for (let i = 1; i < 3; i++) {
            insertPromises.push(dbTest.insertTeacher(i));
        }

        await Promise.all(insertPromises);

        const res = await request(app).get('/api/teachers').set('Authorization', `Bearer ${student.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(expect.arrayContaining([
            { ID: "d0", name: "name0", surname: "surname0", email: "email0" },
            { ID: "d1", name: "name1", surname: "surname1", email: "email1" },
            { ID: "d2", name: "name2", surname: "surname2", email: "email2" },
        ]));
    });
});

describe('GET Cds', () => {
    afterAll(async () => {
        await dbTest.deleteTableContent("DEGREE");
    });
    test('should return a non-empty list when retrieving a list of cds', async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(dbTest.insertDegree(i));
        }

        await Promise.all(insertPromises);

        const res = await request(app).get('/api/cds').set('Authorization', `Bearer ${student.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(expect.arrayContaining([
            { cod_degree: "cod_deg0", title_degree: "title0" },
            { cod_degree: "cod_deg1", title_degree: "title1" },
            { cod_degree: "cod_deg2", title_degree: "title2" },
        ]));
    });
});

describe('POST Thesis', () => {
    beforeAll(async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(dbTest.insertThesis(i, student.degree, teacher.id, date));
            insertPromises.push(dbTest.insertThesisStatus(i, 1));
        }
        insertPromises.push(dbTest.insertKeyword(0));
        insertPromises.push(dbTest.insertType(0));
        insertPromises.push(dbTest.insertGroup(0));
        insertPromises.push(dbTest.insertCoSupervisor(0));

        await Promise.all(insertPromises);
    });
    test('should get all thesis of the departement of the professor', async () => {
        const res = await request(app).post('/api/thesis').set('Authorization', `Bearer ${teacher.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
    });

    test('should get all thesis of the departement of the student', async () => {

        const res = await request(app).post('/api/thesis').set('Authorization', `Bearer ${student.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
    });

    test('should get all thesis of the departement of the student with filters', async () => {
        const body = {
            filters: {
                keyword: ["keyword0", "keyword2"],
                type: ["type0", "type1"],
                supervisor: ["d0"],
                group: ["cod_g0", "cod_g2"],
                cosupervisor: ["email0", "email1"],
                exp_date: date
            }
        }

        const res = await request(app).post('/api/thesis').set('Authorization', `Bearer ${student.jwt}`).send(body);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
    });
});
