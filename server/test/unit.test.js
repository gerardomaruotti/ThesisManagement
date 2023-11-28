const request = require('supertest');
const { app, checkJwt } = require('../index.js');
const db = require('../db');

jest.mock('../db');
jest.mock('express-oauth2-jwt-bearer', () => ({
    auth: jest.fn(() => (_, __, next) => next()),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('GET Keywords', () => {
    test('should return an empty list when retrieving a list of keywords', async () => {
        const kw = [];

        db.getKeywords.mockResolvedValueOnce(kw);
        const res = await request(app).get('/api/keywords');

        expect(db.getKeywords).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('should return a non-empty list when retrieving a list of keywords', async () => {
        const kw = ["Example1", "Example2"];

        db.getKeywords.mockResolvedValueOnce(kw);
        const res = await request(app).get('/api/keywords');

        expect(db.getKeywords).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(kw);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getKeywords.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/keywords');

        expect(db.getKeywords).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual("getKeywords error");

    });
});

describe('GET Types', () => {
    test('should return an empty list when retrieving a list of types', async () => {
        const ty = [];

        db.getTypes.mockResolvedValueOnce(ty);
        const res = await request(app).get('/api/types');

        expect(db.getTypes).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('should return a non-empty list when retrieving a list of types', async () => {
        const ty = ["Example1", "Example2"];

        db.getTypes.mockResolvedValueOnce(ty);
        const res = await request(app).get('/api/types');

        expect(db.getTypes).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(ty);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getTypes.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/types');

        expect(db.getTypes).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual("getTypes error");

    });
});

describe('GET Teachers', () => {
    test('should return an empty list when retrieving a list of teachers', async () => {
        const teach = [];

        db.getTeachers.mockResolvedValueOnce(teach);
        const res = await request(app).get('/api/teachers');

        expect(db.getTeachers).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('should return a non-empty list when retrieving a list of teachers', async () => {
        const teach = ["Example1", "Example2"];

        db.getTeachers.mockResolvedValueOnce(teach);
        const res = await request(app).get('/api/teachers');

        expect(db.getTeachers).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(teach);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getTeachers.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/teachers');

        expect(db.getTeachers).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual("getTeachers error");

    });
});

describe('GET Cds', () => {
    test('should return an empty list when retrieving a list of cds', async () => {
        const cds = [];

        db.getCdS.mockResolvedValueOnce(cds);
        const res = await request(app).get('/api/cds');

        expect(db.getCdS).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('should return a non-empty list when retrieving a list of cds', async () => {
        const cds = ["Example1", "Example2"];

        db.getCdS.mockResolvedValueOnce(cds);
        const res = await request(app).get('/api/cds');

        expect(db.getCdS).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(cds);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getCdS.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/cds');

        expect(db.getCdS).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual("getCds error");

    });
});

describe('GET Thesis', () => {
    test('should get all thesis of the departement of the professor', async () => {
        const user = {
            role: "teacher",
            id: "1"
        }

        const thesis = [
            {
                title: "title1",
                description: "description1",
                requiredKnowledge: "required_knowledge1",
                notes: "notes1",
                expirationDate: "expiration_date1",
                level: "level1",
                cds: "cds1",
                supervisor: "supervisor1",
                keywords: ["keyword1", "keyword2"],
                types: ["type1", "type2"],
                groups: ["group1", "group2"],
                coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            },
            {
                title: "title2",
                description: "description2",
                requiredKnowledge: "required_knowledge2",
                notes: "notes2",
                expirationDate: "expiration_date2",
                level: "level2",
                cds: "cds2",
                supervisor: "supervisor2",
                keywords: ["keyword1", "keyword2"],
                types: ["type1", "type2"],
                groups: ["group1", "group2"],
                coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            }
        ];

        db.getRole.mockResolvedValueOnce(user);
        db.getThesisTeacher.mockResolvedValueOnce(thesis);
        db.getKeywordsbyId.mockResolvedValueOnce(["keyword1", "keyword2"]);
        db.getTypesbyId.mockResolvedValueOnce(["type1", "type2"]);
        const res = await request(app).post('/api/thesis');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisTeacher).toHaveBeenCalledTimes(1);
        expect(db.getThesisTeacher).toHaveBeenCalledWith(user.id);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(thesis);
    });

    test('should get all thesis of the departement of the student', async () => {
        const user = {
            role: "student",
            id: "1"
        }

        const thesis = [
            {
                title: "title1",
                description: "description1",
                requiredKnowledge: "required_knowledge1",
                notes: "notes1",
                expirationDate: "expiration_date1",
                level: "level1",
                cds: "cds1",
                supervisor: "supervisor1",
                keywords: ["keyword1", "keyword2"],
                types: ["type1", "type2"],
                groups: ["group1", "group2"],
                coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            },
            {
                title: "title2",
                description: "description2",
                requiredKnowledge: "required_knowledge2",
                notes: "notes2",
                expirationDate: "expiration_date2",
                level: "level2",
                cds: "cds2",
                supervisor: "supervisor2",
                keywords: ["keyword1", "keyword2"],
                types: ["type1", "type2"],
                groups: ["group1", "group2"],
                coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            }
        ];

        db.getRole.mockResolvedValueOnce(user);
        db.getThesisStudent.mockResolvedValueOnce(thesis);
        db.getKeywordsbyId.mockResolvedValueOnce(["keyword1", "keyword2"]);
        db.getTypesbyId.mockResolvedValueOnce(["type1", "type2"]);
        const res = await request(app).post('/api/thesis');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledWith(user.id);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(2);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(thesis);
    });

    test('should get all thesis of the departement of the student with filters', async () => {
        const user = {
            role: "student",
            id: "1"
        }

        const body = {
            filters: {
                keyword: ["keyword1"],
                type: ["type1"],
                cosupervisor: { name: "name1", surname: "surname1", email: "email1" },
                supervisor: "supervisor2",
                group: ["group1", "group2"],
                exp_date: "19/03/2025"
            }
        }

        const thesis = [
            {
                id: 1,
                title: "title1",
                description: "description1",
                requiredKnowledge: "required_knowledge1",
                notes: "notes1",
                expirationDate: "12/04/2024",
                level: "level1",
                cds: "cds1",
                supervisor: "supervisor1",
                keywords: ["keyword1", "keyword2"],
                types: ["type1", "type2"],
                groups: ["group1", "group2"],
                coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            },
            {
                id: 2,
                title: "title2",
                description: "description2",
                requiredKnowledge: "required_knowledge2",
                notes: "notes2",
                expirationDate: "12/06/2024",
                level: "level2",
                cds: "cds2",
                supervisor: "supervisor2",
                keywords: ["keyword1", "keyword2"],
                types: ["type1", "type2"],
                groups: ["group1", "group2"],
                coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            }
        ];

        db.getRole.mockResolvedValueOnce(user);
        db.getThesisStudent.mockResolvedValueOnce(thesis);
        db.getKeywordsbyId.mockResolvedValue(["keyword1", "keyword2"]);
        db.getTypesbyId.mockResolvedValue(["type1", "type2"]);
        db.getCoSupervisorsEmail.mockResolvedValue(["email1, email2"]);
        db.getThesisSupervisor.mockResolvedValueOnce("supervisor1");
        db.getThesisSupervisor.mockResolvedValueOnce("supervisor2");
        db.getGroup.mockResolvedValue(["group1", "group2"]);
        db.getThesisExpDate.mockResolvedValue("12/06/2024");
        const res = await request(app).post('/api/thesis').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledWith(user.id);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(4);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(4);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(2);
        expect(db.getCoSupervisorsEmail).toHaveBeenCalledTimes(2);
        expect(db.getGroup).toHaveBeenCalledTimes(2);
        expect(db.getThesisExpDate).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([thesis[1]]);
    });

    test('should return a 500 error if error occurs', async () => {
        db.getRole.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/thesis');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledTimes(0);
        expect(db.getThesisTeacher).toHaveBeenCalledTimes(0);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(0);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(500);
    });
});

describe('GET User Info', () => {
    test('should return an object containing the info of the authenticated user', async () => {
        const userInfo = {
            id: 1,
            role: "student",
        };

        db.getRole.mockResolvedValueOnce(userInfo);
        const res = await request(app).get('/api/user');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(userInfo);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getRole.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/user');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual("error retrieving user info");

    });
});

describe('GET Groups', () => {
    test('should return a empty list when retrieving a list of groups', async () => {
        const groups = [];

        db.getGroups.mockResolvedValueOnce(groups);
        const res = await request(app).get('/api/groups');

        expect(db.getGroups).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toHaveLength(0);
        expect(res.body).toEqual([]);
    });

    test('should return a non-empty list when retrieving a list of groups', async () => {
        const groups = ["Example1", "Example2"];

        db.getGroups.mockResolvedValueOnce(groups);
        const res = await request(app).get('/api/groups');

        expect(db.getGroups).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(groups);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getGroups.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/groups');

        expect(db.getGroups).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual("getGroups error");

    });
});

describe('GET Supervisors Groups', () => {
    test('should return a non-empty list when retrieving a list of groups', async () => {
        const groups = ["Example1", "Example2"];

        db.getGroupSupervisorAndCoSupervisor.mockResolvedValueOnce(groups);
        const res = await request(app).get('/api/thesis/1/groups');

        expect(db.getGroupSupervisorAndCoSupervisor).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(groups);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getGroupSupervisorAndCoSupervisor.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/1/groups');

        expect(db.getGroupSupervisorAndCoSupervisor).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nella restituzione dei gruppi' });

    });

    test('should return a 400 error when the id parameter is not a number', async () => {

        const res = await request(app).get('/api/thesis/Nan/groups');

        expect(db.getGroupSupervisorAndCoSupervisor).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis ID.' });

    });

    test('should return a 400 error when the id parameter is a number less than or equal to zero', async () => {
        const res = await request(app).get('/api/thesis/0/groups');

        expect(db.getGroupSupervisorAndCoSupervisor).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis ID.' });

    });
});

describe('Insert Thesis', () => {
    test('should insert a new thesis correctly', async () => {
        const thesis = {
            title: "title",
            description: "description",
            required_knowledge: "required_knowledge",
            notes: "notes",
            expiration_date: "expiration_date",
            level: "level",
            degree: "degree",
            types: ["type1", "type2"],
            supervisor: "supervisor",
            co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({ role: "teacher", id: "1" });
        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockResolvedValueOnce(1);
        db.insertType.mockResolvedValueOnce(1);
        const res = await request(app).post('/api/insert/thesis').send(thesis);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(2);
        expect(db.insertKeyword).toHaveBeenCalledTimes(2);
        expect(db.insertType).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(1);
    });

    test('should return a 401 error when user is unauthorized', async () => {
        const thesis = {
            title: "title",
            description: "description",
            required_knowledge: "required_knowledge",
            notes: "notes",
            expiration_date: "expiration_date",
            level: "level",
            degree: "degree",
            types: ["type1", "type2"],
            supervisor: "supervisor",
            co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({ role: "example", id: "1" });
        const res = await request(app).post('/api/insert/thesis').send(thesis);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });

    });

    test('should return a 503 error when an error occurs while inserting new thesis in db', async () => {
        const thesis = {
            title: "title",
            description: "description",
            required_knowledge: "required_knowledge",
            notes: "notes",
            expiration_date: "expiration_date",
            level: "level",
            degree: "degree",
            types: ["type1", "type2"],
            supervisor: "supervisor",
            co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({ role: "teacher", id: "1" });
        db.insertThesis.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nell inserimento' });

    });

    test('should return a 503 error when an error occurs while inserting new co supervisor in db', async () => {
        const thesis = {
            title: "title",
            description: "description",
            required_knowledge: "required_knowledge",
            notes: "notes",
            expiration_date: "expiration_date",
            level: "level",
            degree: "degree",
            types: ["type1", "type2"],
            supervisor: "supervisor",
            co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({ role: "teacher", id: "1" });
        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nell inserimento' });

    });

    test('should return a 503 error when an error occurs while inserting new keyword in db', async () => {
        const thesis = {
            title: "title",
            description: "description",
            required_knowledge: "required_knowledge",
            notes: "notes",
            expiration_date: "expiration_date",
            level: "level",
            degree: "degree",
            types: ["type1", "type2"],
            supervisor: "supervisor",
            co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({ role: "teacher", id: "1" });
        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(2);
        expect(db.insertKeyword).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nell inserimento' });

    });

    test('should return a 503 error when an error occurs while inserting new type in db', async () => {
        const thesis = {
            title: "title",
            description: "description",
            required_knowledge: "required_knowledge",
            notes: "notes",
            expiration_date: "expiration_date",
            level: "level",
            degree: "degree",
            types: ["type1", "type2"],
            supervisor: "supervisor",
            co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({ role: "teacher", id: "1" });
        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockResolvedValueOnce(1);
        db.insertType.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(2);
        expect(db.insertKeyword).toHaveBeenCalledTimes(2);
        expect(db.insertType).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nell inserimento' });
    });

    test('should return a 503 error when an error occurs while inserting thesis status in db', async () => {
        const thesis = {
            title: "title",
            description: "description",
            required_knowledge: "required_knowledge",
            notes: "notes",
            expiration_date: "expiration_date",
            level: "level",
            degree: "degree",
            types: ["type1", "type2"],
            supervisor: "supervisor",
            co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({ role: "teacher", id: "1" });
        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockResolvedValueOnce(1);
        db.insertType.mockResolvedValueOnce(1);
        db.insertThesisStatus.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(2);
        expect(db.insertKeyword).toHaveBeenCalledTimes(2);
        expect(db.insertType).toHaveBeenCalledTimes(2);
        expect(db.insertThesisStatus).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nell inserimento' });
    });
});

describe('GET Thesis by ID', () => {
    test('should get the thesis by id', async () => {
        const thesis = {
            title: "title",
            description: "description",
            requiredKnowledge: "required_knowledge",
            notes: "notes",
            expirationDate: "expiration_date",
            level: "level",
            cds: "cds",
            supervisor: "supervisor",
            keywords: ["keyword1", "keyword2"],
            types: ["type1", "type2"],
            groups: ["group1", "group2"],
            coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
        };

        const keywords = ["keyword1", "keyword2"];
        const types = ["type1", "type2"];
        const groups = ["group1", "group2"];
        const co_supervisors = [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }];

        db.getThesis.mockResolvedValueOnce(thesis);
        db.getTitleDegree.mockResolvedValueOnce("cds");
        db.getTeacher.mockResolvedValueOnce("supervisor");
        db.getKeywordsbyId.mockResolvedValueOnce(keywords);
        db.getTypesbyId.mockResolvedValueOnce(types);
        db.getGroupSupervisorAndCoSupervisor.mockResolvedValueOnce(groups);
        db.getCoSupervisors.mockResolvedValueOnce(co_supervisors);
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getTitleDegree).toHaveBeenCalledTimes(1);
        expect(db.getTeacher).toHaveBeenCalledTimes(1);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(1);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(1);
        expect(db.getGroupSupervisorAndCoSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getCoSupervisors).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(thesis);
    });

    test('should return a 400 error for invalid id', async () => {
        const res = await request(app).get('/api/thesis/0');

        expect(db.getThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis ID.' });
    });

    test('should return a 500 if error occurs in getThesis', async () => {
        db.getThesis.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Errore visualizzazione tesi' });
    });

    test('should return a 500 if error occurs in getTitleDegree', async () => {
        db.getThesis.mockResolvedValueOnce({});
        db.getTitleDegree.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getTitleDegree).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Errore visualizzazione tesi' });
    });

    test('should return a 500 if error occurs in getTeacher', async () => {
        db.getThesis.mockResolvedValueOnce({});
        db.getTitleDegree.mockResolvedValueOnce({});
        db.getTeacher.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getTitleDegree).toHaveBeenCalledTimes(1);
        expect(db.getTeacher).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Errore visualizzazione tesi' });
    });

    test('should return a 500 if error occurs in getKeywordsbyId', async () => {
        db.getThesis.mockResolvedValueOnce({});
        db.getTitleDegree.mockResolvedValueOnce({});
        db.getTeacher.mockResolvedValueOnce({});
        db.getKeywordsbyId.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getTitleDegree).toHaveBeenCalledTimes(1);
        expect(db.getTeacher).toHaveBeenCalledTimes(1);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Errore visualizzazione tesi' });
    });

    test('should return a 500 if error occurs in getTypesbyId', async () => {
        db.getThesis.mockResolvedValueOnce({});
        db.getTitleDegree.mockResolvedValueOnce({});
        db.getTeacher.mockResolvedValueOnce({});
        db.getKeywordsbyId.mockResolvedValueOnce({});
        db.getTypesbyId.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getTitleDegree).toHaveBeenCalledTimes(1);
        expect(db.getTeacher).toHaveBeenCalledTimes(1);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(1);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Errore visualizzazione tesi' });
    });

    test('should return a 500 if error occurs in getGroupSupervisorAndCoSupervisor', async () => {
        db.getThesis.mockResolvedValueOnce({});
        db.getTitleDegree.mockResolvedValueOnce({});
        db.getTeacher.mockResolvedValueOnce({});
        db.getKeywordsbyId.mockResolvedValueOnce({});
        db.getTypesbyId.mockResolvedValueOnce({});
        db.getGroupSupervisorAndCoSupervisor.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getTitleDegree).toHaveBeenCalledTimes(1);
        expect(db.getTeacher).toHaveBeenCalledTimes(1);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(1);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(1);
        expect(db.getGroupSupervisorAndCoSupervisor).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Errore visualizzazione tesi' });
    });

    test('should return a 500 if error occurs in getCoSupervisors', async () => {
        db.getThesis.mockResolvedValueOnce({});
        db.getTitleDegree.mockResolvedValueOnce({});
        db.getTeacher.mockResolvedValueOnce({});
        db.getKeywordsbyId.mockResolvedValueOnce({});
        db.getTypesbyId.mockResolvedValueOnce({});
        db.getGroupSupervisorAndCoSupervisor.mockResolvedValueOnce({});
        db.getCoSupervisors.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getTitleDegree).toHaveBeenCalledTimes(1);
        expect(db.getTeacher).toHaveBeenCalledTimes(1);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(1);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(1);
        expect(db.getGroupSupervisorAndCoSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getCoSupervisors).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Errore visualizzazione tesi' });
    });
});

describe('Apply for Proposal', () => {
    test('should insert an apply for a proposal', async () => {
        const user = {
            role: "student",
            id: "1"
        }

        const props = [];

        db.getRole.mockResolvedValueOnce(user);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce(props);
        db.insertApplication.mockResolvedValueOnce();

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5");
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledWith(user.id);
        expect(db.insertApplication).toHaveBeenCalledTimes(1);
        expect(db.insertApplication).toHaveBeenCalledWith(user.id, "5");
        expect(res.status).toBe(200);
        expect(res.body).toEqual('Inserimento avvenuto con successo');
    });

    test('should return a 400 error when the id parameter identifies a thesis not active', async () => {
        const user = {
            role: "student",
            id: "1"
        }

        db.getRole.mockResolvedValueOnce(user);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(0);
        db.getStudentApplications.mockResolvedValueOnce([]);

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5");
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Thesis not active' });
    });

    test('should return a 401 error when the user is not a student', async () => {
        const user = {
            role: "not_student",
            id: "1"
        }

        db.getRole.mockResolvedValueOnce(user);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce([])

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5");
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test('should return a 400 error when the user already has a pending application', async () => {
        const user = {
            role: "not_student",
            id: "1"
        }

        const props = [
            { id: "1", state: "0" },
            { id: "2", state: "2" },
        ]

        db.getRole.mockResolvedValueOnce(user);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce(props);

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5");
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Pending or accepted application already exists' });
    });

    test('should return a 400 error when the user already has an accepted applications', async () => {
        const user = {
            role: "not_student",
            id: "1"
        }

        const props = [
            { id: "1", state: "1" },
            { id: "2", state: "2" },
        ]

        db.getRole.mockResolvedValueOnce(user);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce(props);

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5");
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Pending or accepted application already exists' });
    });

    test('should return a 500 if error occurs', async () => {
        db.getRole.mockRejectedValueOnce(new Error('Internal server error'));

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(0);
        expect(db.checkThesisActive).toHaveBeenCalledTimes(0);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nell inserimento della proposta di tesi' });
    });

    test('should return a 400 error when the id parameter is not a number', async () => {

        const res = await request(app).post('/api/thesis/Nan/apply');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.getThesis).toHaveBeenCalledTimes(0);
        expect(db.checkThesisActive).toHaveBeenCalledTimes(0);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis ID.' });

    });

    test('should return a 400 error when the id parameter is a number less than or equal to zero', async () => {

        const res = await request(app).post('/api/thesis/0/apply');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.getThesis).toHaveBeenCalledTimes(0);
        expect(db.checkThesisActive).toHaveBeenCalledTimes(0);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis ID.' });

    });
});

describe('GET Theacher and Student Application', () => {
    test('should get the applications by teacher', async () => {
        const user = {
            role: "teacher",
            id: "1"
        }
        const applications = [
            {
                id: 1,
                title: "title1",
                expirationDate: "12/04/2024",
                level: "level1",
                degree: "degree1",
                student: "student1",
            },
            {
                id: 2,
                title: "title2",
                expirationDate: "12/06/2024",
                level: "level2",
                degree: "degree2",
                student: "student2",
            }
        ];

        db.getRole.mockResolvedValueOnce(user);
        db.getTeacherApplications.mockResolvedValueOnce(applications);

        const res = await request(app).get('/api/thesis/applications/browse');
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getTeacherApplications).toHaveBeenCalledTimes(1);
        expect(db.getTeacherApplications).toHaveBeenCalledWith(user.id);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(applications);

    });

    test('should get the applications by student', async () => {
        const user = {
            role: "student",
            id: "1"
        }
        const applications = [
            {
                id: 1,
                title: "title1",
                expirationDate: "12/04/2024",
                level: "level1",
                degree: "degree1",
                supervisor: "supervisor1",
                state: 1,
            },
            {
                id: 2,
                title: "title2",
                expirationDate: "12/06/2024",
                level: "level2",
                degree: "degree2",
                supervisor: "supervisor2",
                state: 3,
            }
        ];

        db.getRole.mockResolvedValueOnce(user);
        db.getStudentApplications.mockResolvedValueOnce(applications);

        const res = await request(app).get('/api/thesis/applications/browse');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledWith(user.id);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(applications);

    });

    test('should return a 401 error when user is unauthorized', async () => {
        const user = {
            role: "example",
            id: "1"
        }

        db.getRole.mockResolvedValueOnce(user);
        const res = await request(app).get('/api/thesis/applications/browse');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });

    });

    test('should return a 503 error when an error occurs', async () => {
        db.getRole.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).get('/api/thesis/applications/browse');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "GetApplications error" });

    });
});

describe('POST Accept Application', () => {
    test('should accept an application and cancel the other ones for that thesis', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        const user = {
            role: "teacher"
        };

        const application = {
            available: 1,
            data: {
                state: 0,
            }
        }

        const result = "accepted"

        db.getRole.mockResolvedValueOnce(user);
        db.checkExistenceApplication.mockResolvedValueOnce(application);
        db.acceptApplication.mockResolvedValueOnce(result);
        db.cancelApplications.mockResolvedValueOnce();
        db.archiveThesis.mockResolvedValueOnce();

        const res = await request(app).post('/api/accept/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(db.acceptApplication).toHaveBeenCalledTimes(1);
        expect(db.acceptApplication).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(db.cancelApplications).toHaveBeenCalledTimes(1);
        expect(db.cancelApplications).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(db.archiveThesis).toHaveBeenCalledTimes(1);
        expect(db.archiveThesis).toHaveBeenCalledWith(body.thesisID);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(result);
    });

    test('should return a 400 when application is not avialable', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        const user = {
            role: "teacher"
        };

        const application = {
            available: 0,
            data: {
                state: 0,
            }
        }

        db.getRole.mockResolvedValueOnce(user);
        db.checkExistenceApplication.mockResolvedValueOnce(application);

        const res = await request(app).post('/api/accept/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Applicazione inesistente' });

    });

    test('should return a 400 when the application is not pending', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        const user = {
            role: "teacher"
        };

        const application = {
            available: 1,
            data: {
                state: 1,
            }
        }

        db.getRole.mockResolvedValueOnce(user);
        db.checkExistenceApplication.mockResolvedValueOnce(application);

        const res = await request(app).post('/api/accept/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Applicazione inesistente' });
    });

    test('should return a 401 when called from a user that is not a teacher', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        const user = {
            role: "student"
        };

        db.getRole.mockResolvedValueOnce(user);

        const res = await request(app).post('/api/accept/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    });

    test('should return a 503 when an error occurs', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        db.getRole.mockRejectedValueOnce(new Error('Internal server error'))

        const res = await request(app).post('/api/accept/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "Errore nell'accettazione di una tesi" });
    });

    test('should return a 422 if thesisID is Nan', async () => {
        const body = {
            thesisID: "Nan",
            studentID: "id1"
        };

        const res = await request(app).post('/api/accept/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(2);
    });

    test('should return a 422 if thesisID is greater than zero', async () => {
        const body = {
            thesisID: 0,
            studentID: "id1"
        };

        const res = await request(app).post('/api/accept/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 if studentID is not a string or is an empty one', async () => {
        const body = {
            thesisID: 1,
            studentID: "   "
        };

        const res = await request(app).post('/api/accept/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });


});

describe('POST Reject Application', () => {
    test('should reject an application', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        const user = {
            role: "teacher"
        };

        const application = {
            available: 1,
            data: {
                state: 0,
            }
        }

        const result = "rejected"

        db.getRole.mockResolvedValueOnce(user);
        db.checkExistenceApplication.mockResolvedValueOnce(application);
        db.rejectApplication.mockResolvedValueOnce(result);

        const res = await request(app).post('/api/reject/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(db.rejectApplication).toHaveBeenCalledTimes(1);
        expect(db.rejectApplication).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(result);
    });

    test('should return a 400 when application is not avialable', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        const user = {
            role: "teacher"
        };

        const application = {
            available: 0,
            data: {
                state: 0,
            }
        }

        db.getRole.mockResolvedValueOnce(user);
        db.checkExistenceApplication.mockResolvedValueOnce(application);

        const res = await request(app).post('/api/reject/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Applicazione inesistente' });

    });

    test('should return a 400 when the application is not pending', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        const user = {
            role: "teacher"
        };

        const application = {
            available: 1,
            data: {
                state: 1,
            }
        }


        db.getRole.mockResolvedValueOnce(user);
        db.checkExistenceApplication.mockResolvedValueOnce(application);

        const res = await request(app).post('/api/reject/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(body.thesisID, body.studentID);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Applicazione inesistente' });
    });

    test('should return a 401 when called from a user that is not a teacher', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        const user = {
            role: "student"
        };

        db.getRole.mockResolvedValueOnce(user);

        const res = await request(app).post('/api/reject/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    });

    test('should return a 503 when an error occurs', async () => {
        const body = {
            thesisID: 1,
            studentID: "id1"
        };

        db.getRole.mockRejectedValueOnce(new Error('Internal server error'))

        const res = await request(app).post('/api/reject/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "Errore nella reject di una tesi" });
    });

    test('should return a 422 if thesisID is Nan', async () => {
        const body = {
            thesisID: "Nan",
            studentID: "id1"
        };

        const res = await request(app).post('/api/reject/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(2);
    });

    test('should return a 422 if thesisID is greater than zero', async () => {
        const body = {
            thesisID: 0,
            studentID: "id1"
        };

        const res = await request(app).post('/api/reject/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 if studentID is not a string or is an empty one', async () => {
        const body = {
            thesisID: 1,
            studentID: "   "
        };

        const res = await request(app).post('/api/reject/application').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });
});

describe('PUT Edit Thesis', () => {
    test('should correclty update a thesis', async () => {
        const body = {
            title: "Title1",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const user = {
            id: "userId",
            role: "teacher"
        };

        const application = 0;

        db.getRole.mockResolvedValueOnce(user);
        db.getThesisSupervisor.mockResolvedValueOnce("userId");
        db.checkExistenceApplicationForThesis.mockResolvedValueOnce(application);
        db.deleteCoSupervisor.mockResolvedValueOnce();
        db.insertCoSupervisor.mockResolvedValueOnce();
        db.deleteKeyword.mockResolvedValueOnce();
        db.insertKeyword.mockResolvedValue();
        db.deleteType.mockResolvedValueOnce();
        db.insertType.mockResolvedValue();
        db.editThesis.mockResolvedValueOnce();


        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledWith("1");
        expect(db.deleteCoSupervisor).toHaveBeenCalledTimes(1);
        expect(db.deleteKeyword).toHaveBeenCalledTimes(1);
        expect(db.deleteType).toHaveBeenCalledTimes(1);
        expect(db.deleteCoSupervisor).toHaveBeenCalledWith("1");
        expect(db.deleteKeyword).toHaveBeenCalledWith("1");
        expect(db.deleteType).toHaveBeenCalledWith("1");
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(body.co_supervisors.length);
        expect(db.insertKeyword).toHaveBeenCalledTimes(body.keywords.length);
        expect(db.insertType).toHaveBeenCalledTimes(body.types.length);
        expect(db.editThesis).toHaveBeenCalledTimes(1);
        expect(db.editThesis).toHaveBeenCalledWith("1", body.title, body.description, body.required_knowledge, body.notes, body.expiration_date, body.level, body.degree)
        expect(res.status).toBe(200);
        expect(res.body).toEqual("1");
    });

    test('should return a 400 error when the id parameter is not a number', async () => {
        const res = await request(app).put('/api/edit/thesis/Nan');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis Id.' });
    });

    test('should return a 400 error when the id parameter is a number less than or equal to zero', async () => {
        const res = await request(app).put('/api/edit/thesis/0');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis Id.' });
    });

    test('should return a 401 when called from a user that is not a teacher', async () => {
        const body = {
            title: "Title1",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const user = {
            role: "student"
        };


        db.getRole.mockResolvedValueOnce(user);

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test('should return a 400 when called on a thesis for which the teacher is not the supervisor.', async () => {
        const body = {
            title: "Title1",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const user = {
            id: "userId",
            role: "teacher"
        };

        const application = 1;


        db.getRole.mockResolvedValueOnce(user);
        db.getThesisSupervisor.mockResolvedValueOnce("NotuserId");

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The teacher do not have the permission to modify the thesis' });
    });

    test('should return a 400 when called on a thesis that has already at least one application', async () => {
        const body = {
            title: "Title1",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const user = {
            id: "userId",
            role: "teacher"
        };

        const application = 1;


        db.getRole.mockResolvedValueOnce(user);
        db.getThesisSupervisor.mockResolvedValueOnce("userId");
        db.checkExistenceApplicationForThesis.mockResolvedValueOnce(application);

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledWith("1");
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The thesis has applications, cannot be modified' });
    });

    test('should return a 503 when an error occurs', async () => {
        const body = {
            title: "Title1",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };


        db.getRole.mockRejectedValueOnce(new Error('Internal server error'));

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nella modifica della tesi' });
    });

    test('should return a 422 when title is not a string or is an empty one', async () => {
        const body = {
            title: "  ",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when description is not a string or is an empty one', async () => {
        const body = {
            title: "title",
            description: "   ",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when required knowledge is not a string', async () => {
        const body = {
            title: "Title",
            description: "Description",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when notes is not a string', async () => {
        const body = {
            title: "Title",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when expiration_date is not a string or it has not 10 length', async () => {
        const body = {
            title: "Title",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "Date",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when level is not a string or is an empty one', async () => {
        const body = {
            title: "Title",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "  ",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when degree is not a string or is an empty one', async () => {
        const body = {
            title: "Title",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "level",
            degree: "  ",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when types is not an array', async () => {
        const body = {
            title: "Title",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            co_supervisors: ["co-1", "co-2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when keywords is not an array', async () => {
        const body = {
            title: "Title",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            co_supervisors: ["co-1", "co-2"],
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });

    test('should return a 422 when co_supervisors is not an array', async () => {
        const body = {
            title: "Title",
            description: "Description",
            required_knowledge: "Requiredknowledge",
            notes: "Notes",
            expiration_date: "01/01/2023",
            level: "Level",
            degree: "degree",
            types: ["type1", "type2"],
            keywords: ["key1", "key2"]
        };

        const res = await request(app).put('/api/edit/thesis/1').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });
});