const request = require('supertest');
const { app } = require('../index.js');
const dbTest = require('./insert4test.js')
const date = '2024-01-01'
jest.mock('node-cron', () => ({
    schedule: jest.fn(),
}));

const teacher = {
    id: "d0",
    group: "cod_g0",
    jwt : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdKbkgwVGlRSFdkUHUtMzFRSktTTiJ9.eyJpc3MiOiJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1NTI2MmQzMmQ1OGM0M2M2ODA1YmQwYiIsImF1ZCI6WyJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwNDg5NzMxNiwiZXhwIjoxNzA3NDg5MzE2LCJhenAiOiJJZFBrSHRKY280Nkt1T0FnZjFUcDhMakJEUmMwYjJmZyIsInNjb3BlIjoib3BlbmlkIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEifQ.IbqAz0HZJSg2aMxzr4tnrQUsokyatXyZ--369Mbb-CH-SYv6-XJvwWVY87-H_StYNT0on0I9nF37nLtu_O046T31SPzI6PpOCFo9_xu27pwWobian90Iiyp9J1gwypAuqfasUWy2HSNDtlVN_S0bQbiYra_I79OJPM9-LkhMdnzq-TNlkp1i-ze1CMYk_aGTWiXOVT9ASPGtgZUDEeU1PQ_Cg-WRU1PHx1yvovKOQ7x2tUiM-9hlYKMZPHYRtjl_7yFI3-psrws_4AENHOYnz7dypkD0fz7jB_W2eJWkEKIzj4hpNXppzvrFw9NtM9cn0wp324EI8QEOK8g3x4GfKA'
}

const student = {
    id: "s0",
    degree: "cod_deg0",
    jwt : 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdKbkgwVGlRSFdkUHUtMzFRSktTTiJ9.eyJpc3MiOiJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDY1NGNhYTljNTBkZGQwZTAxOTg0ZmU2NCIsImF1ZCI6WyJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tL2FwaS92Mi8iLCJodHRwczovL3RoZXNpc21hbmFnZW1lbnQuZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTcwNDg5NzIyOCwiZXhwIjoxNzA3NDg5MjI4LCJhenAiOiJJZFBrSHRKY280Nkt1T0FnZjFUcDhMakJEUmMwYjJmZyIsInNjb3BlIjoib3BlbmlkIHJlYWQ6Y3VycmVudF91c2VyIHVwZGF0ZTpjdXJyZW50X3VzZXJfbWV0YWRhdGEifQ.hgLo6p8qAgScTvrtWsTWpe5e3gmOk8Xg3GSkK6Zso-Q2xyOUU7Ni0vTOIZ5oe-xnBesV0TcM5vlsKyDhDFBC_jUmFhLlb6VKReD5hHoyCUZ1aLDzZxmgJjUvZnkl0n-Fka4bsFegnlQ1bgkgx15UwfxrGlQUkjPWIJRbRkMip5qD6M_UCH-JuZHWx-njhyjYLV22T8vODkDxaFBr8IW1-ySYOG1FhFFPtprRRXKmonoubqx3Y1dB0uCHT0-Ngk_KahgHzFH3XBpYr7DiR4T0SDj0yhmVU97gNHs_uxjLySk4IZgENu98OsOwfqiQ04rUW5zRoeH_tjBxj1hGZbI-oA'    
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

    afterAll(async () => {
        await dbTest.deleteTableContent("CO_SUPERVISOR");
        await dbTest.deleteTableContent("GROUP");
        await dbTest.deleteTableContent("KEYWORD");
        await dbTest.deleteTableContent("TYPE");
        await dbTest.deleteTableContent("THESIS_STATUS");
        await dbTest.deleteTableContent("THESIS");
    });

    test('should get all thesis of the departement of the professor', async () => {
        const res = await request(app).post('/api/thesis').set('Authorization', `Bearer ${teacher.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
    });

    test('should get all thesis of the departement of the student', async () => {

        const res = await request(app).post('/api/thesis').set('Authorization', `Bearer ${student.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(0);
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
        expect(res.body).toHaveLength(0);
    });
});


describe('GET Groups', () => {
    beforeAll(async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(dbTest.insertGroup(i));
        }

        await Promise.all(insertPromises);
    });

    afterAll(async () => {
        await dbTest.deleteTableContent("GROUP");
    });
    
    test('should get all groups for a certain thesis', async () => {
        const res = await request(app).get('/api/groups').set('Authorization', `Bearer ${teacher.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(3);
    });
});

describe('GET Supervisors Groups', () => {
    beforeAll(async () => {
        const insertPromises = [];
        insertPromises.push(dbTest.insertThesis(1, student.degree, teacher.id, date));
        insertPromises.push(dbTest.insertThesisStatus(1, 1));
        insertPromises.push(dbTest.insertGroup(0));

        await Promise.all(insertPromises);
    });

    afterAll(async () => {
        await dbTest.deleteTableContent("GROUP");
        await dbTest.deleteTableContent("THESIS_STATUS");
        await dbTest.deleteTableContent("THESIS");
    });
    
    test('should get all groups for a certain thesis', async () => {
        const res = await request(app).get('/api/thesis/1/groups').set('Authorization', `Bearer ${teacher.jwt}`);

        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(1);
    });
});

const thesis = {
    title: 'Default Title',
    description: 'Default Description',
    required_knowledge: 'Default Knowledge',
    notes: 'Default Notes',
    expiration_date: '2024-06-06',
    level: 'Default Level',
    degree: 'Default Degree',
    types: ['type1'],
    co_supervisors: ['co-1'],
    keywords: ['k1', 'k2']
  };

describe('POST INSERT THESIS', () => {
    afterAll(async () => {
        await dbTest.deleteTableContent("CO_SUPERVISOR");
        await dbTest.deleteTableContent("KEYWORD");
        await dbTest.deleteTableContent("TYPE");
        await dbTest.deleteTableContent("THESIS_STATUS");
        await dbTest.deleteTableContent("THESIS");
    });
    
    test('should insert correctly a thesis', async () => {
        const res = await request(app).post('/api/insert/thesis').set('Authorization', `Bearer ${teacher.jwt}`).send(thesis);

        expect(res.status).toBe(200);
        expect(res.body).toEqual(3);
    });
});

describe('GET Thesis by ID', () => {
    beforeAll(async () => {
        const insertPromises = [];
        insertPromises.push(dbTest.insertThesis(2, student.degree, teacher.id, date));
        insertPromises.push(dbTest.insertThesisStatus(2, 1));
        insertPromises.push(dbTest.insertDegree(0));

        await Promise.all(insertPromises);
    });

    afterAll(async () => {
        await dbTest.deleteTableContent("DEGREE");
        await dbTest.deleteTableContent("THESIS_STATUS");
        await dbTest.deleteTableContent("THESIS");
    });
    
    test('should correctly get a thesis given a certain ID', async () => {
        const res = await request(app).get('/api/thesis/2').set('Authorization', `Bearer ${teacher.jwt}`);

        expect(res.status).toBe(200);
    });
});

describe('Apply for Proposal', () => {
    beforeAll(async () => {
        const insertPromises = [];
        insertPromises.push(dbTest.insertThesis(2, student.degree, teacher.id, date));
        insertPromises.push(dbTest.insertThesisStatus(2, 1));
        insertPromises.push(dbTest.insertDegree(0));

        await Promise.all(insertPromises);
    });

    afterAll(async () => {
        await dbTest.deleteTableContent("DEGREE");
        await dbTest.deleteTableContent("THESIS_STATUS");
        await dbTest.deleteTableContent("THESIS");
    });
    
    test('should correctly apply for a thesis', async () => {
        const res = await request(app).get('/api/thesis/2').set('Authorization', `Bearer ${teacher.jwt}`);

        expect(res.status).toBe(200);
    });
});