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
                coSupervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
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
                coSupervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
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
                coSupervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
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
                coSupervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
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
            filters : {
                keyword: ["keyword1"],
                type: ["type1"],
                cosupervisor: {name: "name1", surname: "surname1", email: "email1"},
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
                coSupervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
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
                coSupervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
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
            co_supervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({role: "teacher", id: "1"});
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
            co_supervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({role: "example", id: "1"});
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
            co_supervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({role: "teacher", id: "1"});
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
            co_supervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({role: "teacher", id: "1"});
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
            co_supervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({role: "teacher", id: "1"});
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
            co_supervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({role: "teacher", id: "1"});
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
            co_supervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
            keywords: ["keyword1", "keyword2"]
        };

        db.getRole.mockResolvedValueOnce({role: "teacher", id: "1"});
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
            coSupervisors: [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}],
        };

        const keywords = ["keyword1", "keyword2"];
        const types = ["type1", "type2"];
        const groups = ["group1", "group2"];
        const co_supervisors = [{name: "name1", surname: "surname1", email: "email1"}, {name: "name2", surname: "surname2", email: "email2"}];

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
    test('should insert manage an apply for a proposal', async () => {
        const user = {
            role: "student",
            id: "1"
        }

        db.getRole.mockResolvedValueOnce(user);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.insertProposal.mockResolvedValueOnce();

        const res = await request(app).post('/api/thesis/5/proposal');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5");
        expect(db.insertProposal).toHaveBeenCalledTimes(1);
        expect(db.insertProposal).toHaveBeenCalledWith(user.id, "5");
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

        const res = await request(app).post('/api/thesis/5/proposal');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5");
        expect(db.insertProposal).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Thesis not active' });
    });

    test('should return a 400 error when the id parameter identifies a thesis not active', async () => {
        const user = {
            role: "not_student",
            id: "1"
        }

        db.getRole.mockResolvedValueOnce(user);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/thesis/5/proposal');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5");
        expect(db.insertProposal).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test('should return a 500 if error occurs', async () => {
        db.getRole.mockRejectedValueOnce(new Error('Internal server error'));

        const res = await request(app).post('/api/thesis/5/proposal');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(0);
        expect(db.checkThesisActive).toHaveBeenCalledTimes(0);
        expect(db.insertProposal).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Errore nell inserimento della proposta di tesi' });
    });

    test('should return a 400 error when the id parameter is not a number', async () => {
        
        const res = await request(app).post('/api/thesis/Nan/proposal');
    
        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.getThesis).toHaveBeenCalledTimes(0);
        expect(db.checkThesisActive).toHaveBeenCalledTimes(0);
        expect(db.insertProposal).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis ID.' });
    
      });

      test('should return a 400 error when the id parameter is a number less than or equal to zero', async () => {
        
        const res = await request(app).post('/api/thesis/0/proposal');
    
        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.getThesis).toHaveBeenCalledTimes(0);
        expect(db.checkThesisActive).toHaveBeenCalledTimes(0);
        expect(db.insertProposal).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Invalid thesis ID.' });
    
      });
});