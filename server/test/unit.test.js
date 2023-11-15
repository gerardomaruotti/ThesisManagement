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

describe('GET Theses', () => {
    test('dummy test', async () => {

    });
});

describe('GET Groups', () => {
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

        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockResolvedValueOnce(1);
        db.insertType.mockResolvedValueOnce(1);
        const res = await request(app).post('/api/insert/thesis').send(thesis);

        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(2);
        expect(db.insertKeyword).toHaveBeenCalledTimes(2);
        expect(db.insertType).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(1);
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

        db.insertThesis.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);
    
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

        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);
    
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

        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);
    
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

        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockResolvedValueOnce(1);
        db.insertType.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);
    
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

        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockResolvedValueOnce(1);
        db.insertType.mockResolvedValueOnce(1);
        db.insertThesisStatus.mockRejectedValueOnce(new Error('Internal server error'));
        const res = await request(app).post('/api/insert/thesis').send(thesis);
    
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
    test('dummy test', async () => {

    });
});

describe('Apply for Proposal', () => {
    test('dummy test', async () => {

    });
});