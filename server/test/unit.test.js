const request = require('supertest');
const db = require('../db');
const { app, transporter } = require('../index.js');
const dayjs = require('dayjs');
const currentDate = dayjs();
const cron = require('node-cron');
const date = "2023-07-03";
const teacher = {
    role: "teacher",
    id: "1"
};
const student = {
    role: "student",
    id: "1"
};
const secretary = {
    role: "secretary",
};

const vcBody = {
    date: date
}

const thesis1 = {
    ID: "1",
    title: "title1",
    description: "description1",
    required_knowledge: "required_knowledge1",
    notes: "notes1",
    expiration_date: "2025-01-01",
    level: "level1",
    cds: "cds1",
    degree: "degree1",
    supervisor: "supervisor1",
    keywords: ["keyword1", "keyword2"],
    types: ["type1", "type2"],
    groups: ["group1", "group2"],
    co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
    coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }]
};

const thesis2 = {
    ID: "2",
    title: "title2",
    description: "description2",
    required_knowledge: "required_knowledge2",
    notes: "notes2",
    expiration_date: "2023-01-01",
    level: "level2",
    cds: "cds2",
    degree: "degree2",
    supervisor: "supervisor2",
    keywords: ["keyword1", "keyword2"],
    types: ["type1", "type2"],
    groups: ["group1", "group2"],
    co_supervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
    coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }]

};

const requests = [
    {
        id: 1,
        student: 1,
        supervisor: 1,
    },
    {
        id: 2,
        student: 2,
        supervisor: 2,
    }
]
const applications = [
    {
        id: 1,
        title: "title1",
        expirationDate: "2024-04-12",
        level: "level1",
        degree: "degree1",
        supervisor: "supervisor1",
        state: 1,
    },
    {
        id: 2,
        title: "title2",
        expirationDate: "2024-06-12",
        level: "level2",
        degree: "degree2",
        supervisor: "supervisor2",
        state: 3,
    }
];

const applicationBody = {
    thesisID: 1,
    studentID: "id1"
};

const detailBody = {
    idApplication: 1
};

const tmpApp = {student: "id1", state: 1}
const exams = [{id: 1, grade: 30}, {id: 2, grade: 27}];

const deleteThesisBody = {
    thesisID: 1
};

const thesisExist = {
    available: "1",
    data: {
        id: "1",
        state: "1"
    }
}

const requestBody = {
    requestID: 1,
    notes: "notes"
};

const testFileContent = 'This is the content of the fake file.'
const testFileName = 'test-file.txt'

const genericError = new Error('Internal server error');

jest.mock('../db');
jest.mock('express-oauth2-jwt-bearer', () => ({
    auth: jest.fn(() => (_, __, next) => next()),
}));
jest.mock('nodemailer', () => ({
    createTransport: jest.fn(() => ({
        sendMail: jest.fn(),
    })),
}));
jest.mock('node-cron', () => ({
    schedule: jest.fn(),
}));

beforeEach(() => {
    jest.clearAllMocks();
});

describe('GET Keywords', () => {
    test('should return an empty list when retrieving a list of keywords', async () => {
        db.getKeywords.mockResolvedValueOnce([]);
        const res = await request(app).get('/api/keywords');

        expect(db.getKeywords).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([]);
    });

    test('should return a non-empty list when retrieving a list of keywords', async () => {
        const kw = ["Example1", "Example2"];

        db.getKeywords.mockResolvedValueOnce(["Example1", "Example2"]);
        const res = await request(app).get('/api/keywords');

        expect(db.getKeywords).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(kw);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getKeywords.mockRejectedValueOnce(genericError);
        const res = await request(app).get('/api/keywords');

        expect(db.getKeywords).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'getKeywords error' });

    });
});

describe('GET Types', () => {
    test('should return an empty list when retrieving a list of types', async () => {
        db.getTypes.mockResolvedValueOnce([]);
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
        db.getTypes.mockRejectedValueOnce(genericError);
        const res = await request(app).get('/api/types');

        expect(db.getTypes).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'getTypes error' });

    });
});

describe('GET Teachers', () => {
    test('should return an empty list when retrieving a list of teachers', async () => {

        db.getTeachers.mockResolvedValueOnce([]);
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
        db.getTeachers.mockRejectedValueOnce(genericError);
        const res = await request(app).get('/api/teachers');

        expect(db.getTeachers).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "getTeachers error" });

    });
});

describe('GET Cds', () => {
    test('should return an empty list when retrieving a list of cds', async () => {
        db.getCdS.mockResolvedValueOnce([]);
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
        db.getCdS.mockRejectedValueOnce(genericError);
        const res = await request(app).get('/api/cds');

        expect(db.getCdS).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "getCds error" });

    });
});

describe('POST Thesis', () => {
    test('should get all thesis of the departement of the professor', async () => {

        const thesis = [thesis1, thesis2];

        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getThesisTeacher.mockResolvedValueOnce(thesis);
        db.getKeywordsbyId.mockResolvedValue(["keyword1", "keyword2"]);
        db.getTypesbyId.mockResolvedValue(["type1", "type2"]);
        db.checkExistenceApplicationForThesis.mockResolvedValue(["app1", "app2"]);
        const res = await request(app).post('/api/thesis');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisTeacher).toHaveBeenCalledTimes(1);
        expect(db.getThesisTeacher).toHaveBeenCalledWith(teacher.id, 0);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(2);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(2);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(thesis);
    });

    test('should get all thesis of the departement of the professor using Virtual Clock and filters', async () => {
        const body = {
            filters: {
                supervisor: ["supervisor1", "supervisor2"],
            }
        }
        const thesis = [thesis1, thesis2];

        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getThesisTeacher.mockResolvedValueOnce(thesis);
        db.getKeywordsbyId.mockResolvedValue(["keyword1", "keyword2"]);
        db.getTypesbyId.mockResolvedValue(["type1", "type2"]);
        db.checkExistenceApplicationForThesis.mockResolvedValue(["app1", "app2"]);
        db.getCoSupervisorsEmail.mockResolvedValue(["email1"]);
        db.getThesisSupervisor.mockResolvedValueOnce(thesis1.supervisor);
        db.getThesisSupervisor.mockResolvedValueOnce(thesis2.supervisor);
        db.getGroup.mockResolvedValue(thesis1.groups);
        db.getThesisExpDate.mockResolvedValue(date);
        const res = await request(app).post('/api/thesis').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisTeacher).toHaveBeenCalledTimes(1);
        expect(db.getThesisTeacher).toHaveBeenCalledWith(teacher.id, date);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(2);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(2);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(thesis);
    });

    test('should get all thesis of the departement of the student', async () => {
        const thesis = [thesis1, thesis2];

        db.getRole.mockResolvedValueOnce(student);
        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getThesisStudent.mockResolvedValueOnce(thesis);
        db.getKeywordsbyId.mockResolvedValueOnce(["keyword1", "keyword2"]);
        db.getTypesbyId.mockResolvedValueOnce(["type1", "type2"]);
        const res = await request(app).post('/api/thesis');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledWith(student.id, currentDate.format('YYYY-MM-DD'));
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(2);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(2);
        expect(db.checkExistenceApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(thesis);
    });

    

    test('should get all thesis of the departement of the student with filters and Virtual Clock', async () => {
        const body = {
            filters: {
                keyword: ["keyword1", "keyword3"],
                cosupervisor: ["email1"],
                supervisor: ["supervisor1"],
                group: ["group1", "group2"],
                exp_date: "2024-03-03"
            }
        }

        const thesis = [thesis1, thesis2];

        db.getRole.mockResolvedValueOnce(student);
        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getThesisStudent.mockResolvedValueOnce(thesis);
        db.getKeywordsbyId.mockResolvedValue(thesis1.keywords);
        db.getTypesbyId.mockResolvedValue(thesis1.types);
        db.getCoSupervisorsEmail.mockResolvedValue(["email1"]);
        db.getThesisSupervisor.mockResolvedValueOnce(thesis1.supervisor);
        db.getThesisSupervisor.mockResolvedValueOnce(thesis2.supervisor);
        db.getGroup.mockResolvedValue(thesis1.groups);
        db.getThesisExpDate.mockResolvedValue(date);
        const res = await request(app).post('/api/thesis').send(body);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledTimes(1);
        expect(db.getThesisStudent).toHaveBeenCalledWith(student.id, date);
        expect(db.getKeywordsbyId).toHaveBeenCalledTimes(2);
        expect(db.getTypesbyId).toHaveBeenCalledTimes(2);
        expect(db.getCoSupervisorsEmail).toHaveBeenCalledTimes(2);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(2);
        expect(db.getGroup).toHaveBeenCalledTimes(2);
        expect(db.getThesisExpDate).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual([thesis1]);
    });

    test('should return a 500 error if error occurs', async () => {
        db.getRole.mockRejectedValueOnce(genericError);
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
        db.getRole.mockResolvedValueOnce(student);
        const res = await request(app).get('/api/user');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(student);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getRole.mockRejectedValueOnce(genericError);
        const res = await request(app).get('/api/user');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ "error": "error retrieving user info" });

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
        db.getGroups.mockRejectedValueOnce(genericError);
        const res = await request(app).get('/api/groups');

        expect(db.getGroups).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ "error": "getGroups error" });

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
        db.getGroupSupervisorAndCoSupervisor.mockRejectedValueOnce(genericError);
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
});

describe('Insert Thesis', () => {
    test('should insert a new thesis correctly', async () => {

        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getRole.mockResolvedValueOnce(teacher);
        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockResolvedValueOnce(1);
        db.insertType.mockResolvedValueOnce(1);
        const res = await request(app).post('/api/insert/thesis').send(thesis1);

        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(2);
        expect(db.insertKeyword).toHaveBeenCalledTimes(2);
        expect(db.insertType).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(1);
    });

    test('should insert a new thesis correctly using Virtual Clock', async () => {

        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getRole.mockResolvedValueOnce(teacher);
        db.insertThesis.mockResolvedValueOnce(1);
        db.insertCoSupervisor.mockResolvedValueOnce(1);
        db.insertKeyword.mockResolvedValueOnce(1);
        db.insertType.mockResolvedValueOnce(1);
        const res = await request(app).post('/api/insert/thesis').send(thesis1);

        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(2);
        expect(db.insertKeyword).toHaveBeenCalledTimes(2);
        expect(db.insertType).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(1);
    });

    test('should return a 400 error when expiration date is before the current one', async () => {

        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getRole.mockResolvedValueOnce(teacher);
        const res = await request(app).post('/api/insert/thesis').send(thesis2);

        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The expiration date is not valid, change the expiration date' });
    });

    test('should return a 400 error when expiration date is before the current one using Virtual Clock', async () => {
        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getRole.mockResolvedValueOnce(teacher);
        const res = await request(app).post('/api/insert/thesis').send(thesis2);

        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The expiration date is not valid, change the expiration date' });
    });

    test('should return a 401 error when user is unauthorized', async () => {
        db.getRole.mockResolvedValueOnce(student);
        const res = await request(app).post('/api/insert/thesis').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });

    });

    test('should return a 503 error when an error occurs while inserting new thesis in db', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.insertThesis.mockRejectedValueOnce(genericError);
        const res = await request(app).post('/api/insert/thesis').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertThesis).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the insertion' });

    });

    test('should return a 422 when there is any error in the body', async () => {
        const res = await request(app).post('/api/insert/thesis');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.insertThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(15);
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
            codeDegree: "cds",
            supervisor: "supervisor",
            keywords: ["keyword1", "keyword2"],
            types: ["type1", "type2"],
            groups: ["group1", "group2"],
            coSupervisors: [{ name: "name1", surname: "surname1", email: "email1" }, { name: "name2", surname: "surname2", email: "email2" }],
        };

        db.getThesis.mockResolvedValueOnce(thesis);
        db.getTitleDegree.mockResolvedValueOnce("cds");
        db.getTeacher.mockResolvedValueOnce("supervisor");
        db.getKeywordsbyId.mockResolvedValueOnce(thesis.keywords);
        db.getTypesbyId.mockResolvedValueOnce(thesis.types);
        db.getGroupSupervisorAndCoSupervisor.mockResolvedValueOnce(thesis.groups);
        db.getCoSupervisors.mockResolvedValueOnce(thesis.coSupervisors);
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

    test('should return a 500 if error occurs', async () => {
        db.getThesis.mockRejectedValueOnce(genericError);
        const res = await request(app).get('/api/thesis/1');

        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Error the view of the thesis' });
    });

});

describe('Apply for Proposal', () => {
    test('should insert an apply for a proposal', async () => {

        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getRole.mockResolvedValueOnce(student);
        db.getThesis.mockResolvedValueOnce(thesis1);
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce([]);
        db.insertApplication.mockResolvedValueOnce();
        db.getMailTeacher.mockResolvedValueOnce("d111111@polito.it");
        transporter.sendMail.mockResolvedValueOnce();

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5", 0);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledWith(student.id, 0);
        expect(db.insertApplication).toHaveBeenCalledTimes(1);
        expect(db.insertApplication).toHaveBeenCalledWith(student.id, "5", currentDate.format('YYYY-MM-DD'));
        expect(db.getMailTeacher).toHaveBeenCalledTimes(1);
        expect(db.getMailTeacher).toHaveBeenCalledWith(thesis1.supervisor);
        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual('Insertion Succesful');
    });

    test('should insert an apply for a proposal using Virtual Clock and Cv', async () => {

        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getRole.mockResolvedValueOnce(student);
        db.getThesis.mockResolvedValueOnce(thesis1);
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce([]);
        db.insertApplication.mockResolvedValueOnce(1);
        db.getMailTeacher.mockResolvedValueOnce("d111111@polito.it");
        db.insertCv.mockResolvedValueOnce();
        transporter.sendMail.mockResolvedValueOnce();

        const res = await request(app).post('/api/thesis/5/apply').attach('file', Buffer.from(testFileContent), { filename: testFileName });

        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5", date);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledWith(student.id, date);
        expect(db.insertApplication).toHaveBeenCalledTimes(1);
        expect(db.insertApplication).toHaveBeenCalledWith(student.id, "5", date);
        expect(db.getMailTeacher).toHaveBeenCalledTimes(1);
        expect(db.getMailTeacher).toHaveBeenCalledWith(thesis1.supervisor);
        expect(db.insertCv).toHaveBeenCalledTimes(1);
        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual('Insertion Succesful');
    });

    test('should return a 400 error when the id parameter identifies a thesis not active', async () => {

        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getRole.mockResolvedValueOnce(student);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(0);
        db.getStudentApplications.mockResolvedValueOnce([]);

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5", 0);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Thesis not active' });
    });

    test('should return a 401 error when the user is not a student', async () => {

        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getRole.mockResolvedValueOnce(teacher);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce([])

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5", 0);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test('should return a 400 error when the user already has a pending application', async () => {
        const props = [
            { id: "1", state: "0" },
            { id: "2", state: "2" },
        ]

        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getRole.mockResolvedValueOnce(student);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce(props);

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5", 0);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Pending or accepted application or requests already exists' });
    });

    test('should return a 400 error when the user already has a request', async () => {
        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getRole.mockResolvedValueOnce(student);
        db.getThesis.mockResolvedValueOnce();
        db.checkThesisActive.mockResolvedValueOnce(1);
        db.getStudentApplications.mockResolvedValueOnce([]);
        db.checkPendingStudentRequests.mockResolvedValueOnce(true);

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith("5");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("5", 0);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.checkPendingStudentRequests).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Pending or accepted application or requests already exists' });
    });

    test('should return a 500 if error occurs', async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/thesis/5/apply');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledTimes(0);
        expect(db.checkThesisActive).toHaveBeenCalledTimes(0);
        expect(db.insertApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the insertion of an application' });
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
});

describe('GET Theacher and Student Application', () => {
    test('should get the applications by teacher', async () => {

        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getTeacherApplications.mockResolvedValueOnce(applications);

        const res = await request(app).get('/api/thesis/applications/browse');
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getTeacherApplications).toHaveBeenCalledTimes(1);
        expect(db.getTeacherApplications).toHaveBeenCalledWith(teacher.id, 0);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(applications);
    });

    test('should get the applications by teacher using Virtual Clock', async () => {

        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getTeacherApplications.mockResolvedValueOnce(applications);

        const res = await request(app).get('/api/thesis/applications/browse');
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getTeacherApplications).toHaveBeenCalledTimes(1);
        expect(db.getTeacherApplications).toHaveBeenCalledWith(teacher.id, date);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(applications);
    });

    test('should get the applications by student', async () => {

        db.getRole.mockResolvedValueOnce(student);
        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getStudentApplications.mockResolvedValueOnce(applications);

        const res = await request(app).get('/api/thesis/applications/browse');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledWith(student.id, 0);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(applications);
    });

    test('should get the applications by student using Virtual Clock', async () => {

        db.getRole.mockResolvedValueOnce(student);
        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getStudentApplications.mockResolvedValueOnce(applications);

        const res = await request(app).get('/api/thesis/applications/browse');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledWith(student.id, date);
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
        db.getRole.mockRejectedValueOnce(genericError);
        const res = await request(app).get('/api/thesis/applications/browse');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "GetApplications error" });

    });
});

describe('POST Accept Application', () => {
    test('should accept an application and cancel the other ones for that thesis', async () => {
        const application = {
            available: 1,
            data: {
                state: 0,
            }
        }
        const result = "accepted"

        db.getMailStudent.mockResolvedValueOnce("s111111@studenti.polito.it");
        db.getThesis.mockResolvedValueOnce(thesis1);
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkExistenceApplication.mockResolvedValueOnce(application);
        db.acceptApplication.mockResolvedValueOnce(result);
        db.cancelApplications.mockResolvedValueOnce();
        db.archiveThesis.mockResolvedValueOnce();
        transporter.sendMail.mockResolvedValueOnce();

        const res = await request(app).post('/api/accept/application').send(applicationBody);

        expect(db.getMailStudent).toHaveBeenCalledTimes(1);
        expect(db.getMailStudent).toHaveBeenCalledWith(applicationBody.studentID);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith(applicationBody.thesisID);
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(db.acceptApplication).toHaveBeenCalledTimes(1);
        expect(db.acceptApplication).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(db.cancelApplications).toHaveBeenCalledTimes(1);
        expect(db.cancelApplications).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(db.archiveThesis).toHaveBeenCalledTimes(1);
        expect(db.archiveThesis).toHaveBeenCalledWith(applicationBody.thesisID);
        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(result);
    });

    test('should return a 400 when application is not avialable', async () => {
        const application = {
            available: 0,
            data: {
                state: 0,
            }
        }

        db.getRole.mockResolvedValueOnce(teacher);
        db.checkExistenceApplication.mockResolvedValueOnce(application);

        const res = await request(app).post('/api/accept/application').send(applicationBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Application does not exist' });

    });

    test('should return a 400 when the application is not pending', async () => {
        const application = {
            available: 1,
            data: {
                state: 1,
            }
        }

        db.getRole.mockResolvedValueOnce(teacher);
        db.checkExistenceApplication.mockResolvedValueOnce(application);

        const res = await request(app).post('/api/accept/application').send(applicationBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Application does not exist' });
    });

    test('should return a 401 when called from a user that is not a teacher', async () => {
        db.getRole.mockResolvedValueOnce(student);

        const res = await request(app).post('/api/accept/application').send(applicationBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    });

    test('should return a 503 when an error occurs', async () => {
        db.getRole.mockRejectedValueOnce(genericError)

        const res = await request(app).post('/api/accept/application').send(applicationBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.acceptApplication).toHaveBeenCalledTimes(0);
        expect(db.cancelApplications).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "Error while awhile accepting the application" });
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
});

describe('POST Reject Application', () => {
    test('should reject an application', async () => {
        const application = {
            available: 1,
            data: {
                state: 0,
            }
        }

        const result = "rejected"

        db.getMailStudent.mockResolvedValueOnce("s111111@studenti.polito.it");
        db.getRole.mockResolvedValueOnce(teacher);
        db.getThesis.mockResolvedValueOnce(thesis1);
        db.checkExistenceApplication.mockResolvedValueOnce(application);
        db.rejectApplication.mockResolvedValueOnce(result);
        transporter.sendMail.mockResolvedValueOnce();

        const res = await request(app).post('/api/reject/application').send(applicationBody);

        expect(db.getMailStudent).toHaveBeenCalledTimes(1);
        expect(db.getMailStudent).toHaveBeenCalledWith(applicationBody.studentID);
        expect(db.getThesis).toHaveBeenCalledTimes(1);
        expect(db.getThesis).toHaveBeenCalledWith(applicationBody.thesisID);
        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(db.rejectApplication).toHaveBeenCalledTimes(1);
        expect(db.rejectApplication).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(transporter.sendMail).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(result);
    });

    test('should return a 400 when application is not avialable', async () => {
        const application = {
            available: 0,
            data: {
                state: 0,
            }
        }

        db.getRole.mockResolvedValueOnce(teacher);
        db.checkExistenceApplication.mockResolvedValueOnce(application);

        const res = await request(app).post('/api/reject/application').send(applicationBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Application does not exist' });

    });

    test('should return a 400 when the application is not pending', async () => {
        const application = {
            available: 1,
            data: {
                state: 1,
            }
        }


        db.getRole.mockResolvedValueOnce(teacher);
        db.checkExistenceApplication.mockResolvedValueOnce(application);

        const res = await request(app).post('/api/reject/application').send(applicationBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledWith(applicationBody.thesisID, applicationBody.studentID);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Application does not exist' });
    });

    test('should return a 401 when called from a user that is not a teacher', async () => {
        db.getRole.mockResolvedValueOnce(student);

        const res = await request(app).post('/api/reject/application').send(applicationBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    });

    test('should return a 503 when an error occurs', async () => {
        db.getRole.mockRejectedValueOnce(genericError)

        const res = await request(app).post('/api/reject/application').send(applicationBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplication).toHaveBeenCalledTimes(0);
        expect(db.rejectApplication).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "Error in the reject of an application" });
    });

    test('should return a 422 if thesisID or studentID in the body are in a wrong format', async () => {
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
});

describe('PUT Edit Thesis', () => {
    test('should correclty update a thesis', async () => {

        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getThesisSupervisor.mockResolvedValueOnce(1);
        db.checkExistenceAcceptedApplicationForThesis.mockResolvedValueOnce(0);
        db.checkThesisActive.mockResolvedValueOnce("0");
        db.deleteCoSupervisor.mockResolvedValueOnce();
        db.insertCoSupervisor.mockResolvedValueOnce();
        db.deleteKeyword.mockResolvedValueOnce();
        db.insertKeyword.mockResolvedValue();
        db.deleteType.mockResolvedValueOnce();
        db.insertType.mockResolvedValue();
        db.activateThesis.mockResolvedValueOnce();
        db.editThesis.mockResolvedValueOnce();


        const res = await request(app).put('/api/edit/thesis/1').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledWith("1");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("1", 0);
        expect(db.deleteCoSupervisor).toHaveBeenCalledTimes(1);
        expect(db.deleteKeyword).toHaveBeenCalledTimes(1);
        expect(db.deleteType).toHaveBeenCalledTimes(1);
        expect(db.deleteCoSupervisor).toHaveBeenCalledWith("1");
        expect(db.deleteKeyword).toHaveBeenCalledWith("1");
        expect(db.deleteType).toHaveBeenCalledWith("1");
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(thesis1.co_supervisors.length);
        expect(db.insertKeyword).toHaveBeenCalledTimes(thesis1.keywords.length);
        expect(db.insertType).toHaveBeenCalledTimes(thesis1.types.length);
        expect(db.activateThesis).toHaveBeenCalledTimes(1);
        expect(db.activateThesis).toHaveBeenCalledWith("1");
        expect(db.editThesis).toHaveBeenCalledTimes(1);
        expect(db.editThesis).toHaveBeenCalledWith("1", thesis1.title, thesis1.description, thesis1.required_knowledge, thesis1.notes, thesis1.expiration_date, thesis1.level, thesis1.degree)
        expect(res.status).toBe(200);
        expect(res.body).toEqual("1");
    });

    test('should correclty update a thesis usign Virtual Clock', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getThesisSupervisor.mockResolvedValueOnce(1);
        db.checkExistenceAcceptedApplicationForThesis.mockResolvedValueOnce(0);
        db.checkThesisActive.mockResolvedValueOnce("1");
        db.deleteCoSupervisor.mockResolvedValueOnce();
        db.insertCoSupervisor.mockResolvedValueOnce();
        db.deleteKeyword.mockResolvedValueOnce();
        db.insertKeyword.mockResolvedValue();
        db.deleteType.mockResolvedValueOnce();
        db.insertType.mockResolvedValue();
        db.editThesis.mockResolvedValueOnce();


        const res = await request(app).put('/api/edit/thesis/1').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledWith("1");
        expect(db.checkThesisActive).toHaveBeenCalledTimes(1);
        expect(db.checkThesisActive).toHaveBeenCalledWith("1", date);
        expect(db.deleteCoSupervisor).toHaveBeenCalledTimes(1);
        expect(db.deleteKeyword).toHaveBeenCalledTimes(1);
        expect(db.deleteType).toHaveBeenCalledTimes(1);
        expect(db.deleteCoSupervisor).toHaveBeenCalledWith("1");
        expect(db.deleteKeyword).toHaveBeenCalledWith("1");
        expect(db.deleteType).toHaveBeenCalledWith("1");
        expect(db.insertCoSupervisor).toHaveBeenCalledTimes(thesis1.co_supervisors.length);
        expect(db.insertKeyword).toHaveBeenCalledTimes(thesis1.keywords.length);
        expect(db.insertType).toHaveBeenCalledTimes(thesis1.types.length);
        expect(db.activateThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(1);
        expect(db.editThesis).toHaveBeenCalledWith("1", thesis1.title, thesis1.description, thesis1.required_knowledge, thesis1.notes, thesis1.expiration_date, thesis1.level, thesis1.degree)
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
        db.getRole.mockResolvedValueOnce(student);

        const res = await request(app).put('/api/edit/thesis/1').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getVirtualDate).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test('should return a 400 when called on a thesis for which the teacher is not the supervisor', async () => {

        db.getRole.mockResolvedValueOnce(teacher);
        db.getThesisSupervisor.mockResolvedValueOnce("NotuserId");

        const res = await request(app).put('/api/edit/thesis/1').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getVirtualDate).toHaveBeenCalledTimes(0);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The teacher does not have the permission to modify the thesis' });
    });

    test('should return a 400 when called on a thesis that has already an application accepted', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getThesisSupervisor.mockResolvedValueOnce(1);
        db.checkExistenceAcceptedApplicationForThesis.mockResolvedValueOnce(1);

        const res = await request(app).put('/api/edit/thesis/1').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledWith("1");
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The thesis has accepted applications and cannot be modified' });
    });

    test('should return a 400 when called with an expired date', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(0);
        db.getThesisSupervisor.mockResolvedValueOnce(1);
        db.checkExistenceAcceptedApplicationForThesis.mockResolvedValueOnce(0);

        const res = await request(app).put('/api/edit/thesis/1').send(thesis2);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledWith("1");
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The expiration date is not valid, change the expiration date' });
    });

    test('should return a 400 when called with an expired date using Virtual Clock', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.getVirtualDate.mockResolvedValueOnce(date);
        db.getThesisSupervisor.mockResolvedValueOnce(1);
        db.checkExistenceAcceptedApplicationForThesis.mockResolvedValueOnce(0);

        const res = await request(app).put('/api/edit/thesis/1').send(thesis2);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith("1");
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledWith("1");
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The expiration date is not valid, change the expiration date' });
    });

    test('should return a 503 when an error occurs', async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).put('/api/edit/thesis/1').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the update of the thesis' });
    });

    test('should return a 422 when there is any issue in the body', async () => {
        const res = await request(app).put('/api/edit/thesis/1');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceAcceptedApplicationForThesis).toHaveBeenCalledTimes(0);
        expect(db.editThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(15);
    });
});

describe('GET VC Date', () => {
    test('should return the date when the Virtual Clock is active', async () => {
        db.getVirtualDate.mockResolvedValueOnce(date);

        const res = await request(app).get('/api/virtualClockStatus');

        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(200);
        expect(res.body).toEqual(date);
    });

    test('should return a 503 when an error occurs', async () => {
        db.getVirtualDate.mockRejectedValueOnce(genericError);

        const res = await request(app).get('/api/virtualClockStatus');

        expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "Get Virtual Clock status error" });
    });
});

describe('PUT VC On', () => {
    test('should set the Virtual Clock to the provided date', async () => {
        db.setVirtualDate.mockResolvedValueOnce();

        const res = await request(app).put('/api/virtualClockOn').send(vcBody);

        expect(db.setVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.setVirtualDate).toHaveBeenCalledWith(vcBody.date);
        expect(res.status).toBe(200);
        expect(res.body).toEqual("Updated");
    });

    test('should return a 503 error when an error occurs', async () => {
        db.setVirtualDate.mockRejectedValueOnce(genericError);

        const res = await request(app).put('/api/virtualClockOn').send(vcBody);

        expect(db.setVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.setVirtualDate).toHaveBeenCalledWith(vcBody.date);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "Update error" });
    });

    test('should return a 422 when date is not a string or it has not 10 length', async () => {
        const body = {
            date: 'NotValidDate'
        };

        const res = await request(app).put('/api/virtualClockOn').send(body);

        expect(db.setVirtualDate).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });
});

describe('PUT VC Off', () => {
    test('should turn off the Virtual Clock', async () => {
        db.setVirtualDate.mockResolvedValueOnce();
        db.resetStatusPastApplications.mockResolvedValueOnce();
        db.deleteFutureApplications.mockResolvedValueOnce();

        const res = await request(app).put('/api/virtualClockOff');

        expect(db.setVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.setVirtualDate).toHaveBeenCalledWith(null);
        expect(db.resetStatusPastApplications).toHaveBeenCalledTimes(1);
        expect(db.resetStatusPastApplications).toHaveBeenCalledWith(currentDate.format("YYYY-MM-DD"));
        expect(db.deleteFutureApplications).toHaveBeenCalledTimes(1);
        expect(db.deleteFutureApplications).toHaveBeenCalledWith(currentDate.format("YYYY-MM-DD"));
        expect(res.status).toBe(200);
        expect(res.body).toEqual("Updated");
    });

    test('should return a 503 error when an error occurs', async () => {
        db.setVirtualDate.mockRejectedValueOnce(genericError);

        const res = await request(app).put('/api/virtualClockOff');

        expect(db.setVirtualDate).toHaveBeenCalledTimes(1);
        expect(db.setVirtualDate).toHaveBeenCalledWith(null);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "Update error" });
    });
});

describe('POST Delete Thesis', () => {
    test('should delete a thesis', async () => {

        db.getRole.mockResolvedValueOnce(teacher);
        db.checkExistenceThesis.mockResolvedValueOnce(thesisExist);
        db.setStatusDeleted.mockResolvedValueOnce();
        db.cancelApplicationsByThesis.mockResolvedValueOnce();

        const res = await request(app).post('/api/delete/thesis').send(deleteThesisBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceThesis).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(db.setStatusDeleted).toHaveBeenCalledTimes(1);
        expect(db.setStatusDeleted).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(db.cancelApplicationsByThesis).toHaveBeenCalledTimes(1);
        expect(db.cancelApplicationsByThesis).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(res.status).toBe(200);
        expect(res.body).toEqual("Thesis deleted successfully");
    });

    test('should return a 422 error when the id parameter is not a number', async () => {
        const res = await request(app).post('/api/delete/thesis');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.checkExistenceThesis).toHaveBeenCalledTimes(0);
        expect(db.setStatusDeleted).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(2);
    });

    test('should return a 401 error when the user is not a teacher', async () => {
        db.getRole.mockResolvedValueOnce(student);

        const res = await request(app).post('/api/delete/thesis').send(deleteThesisBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceThesis).toHaveBeenCalledTimes(0);
        expect(db.setStatusDeleted).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized' });
    });

    test('should return a 400 error when the application does not exist', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkExistenceThesis.mockResolvedValueOnce(0);

        const res = await request(app).post('/api/delete/thesis').send(deleteThesisBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceThesis).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(db.setStatusDeleted).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Thesis proposal does not exist' });
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/delete/thesis').send(deleteThesisBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceThesis).toHaveBeenCalledTimes(0);
        expect(db.setStatusDeleted).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the deletion of the thesis' });
    });
});

const performCommonAssertionsArchive = (res) => {
    expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(db.checkExistenceThesis).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceThesis).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(db.cancelPendingApplications).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The thesis is already archived or deleted' });
};

describe('POST Archive Thesis', () => {
    test('should archive a thesis correctly', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.getThesisSupervisor.mockResolvedValueOnce(teacher.id);
        db.checkExistenceThesis.mockResolvedValueOnce(thesisExist);
        db.archiveThesis.mockResolvedValueOnce();
        db.cancelPendingApplications.mockResolvedValueOnce();

        const res = await request(app).post('/api/archive/thesis').send(deleteThesisBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(db.checkExistenceThesis).toHaveBeenCalledTimes(1);
        expect(db.archiveThesis).toHaveBeenCalledTimes(1);
        expect(db.cancelPendingApplications).toHaveBeenCalledTimes(1);
        expect(db.archiveThesis).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(db.cancelPendingApplications).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(res.status).toBe(200);
        expect(res.body).toEqual("Thesis archived successfully");
    });

    test('should return a 422 error when the id parameter is not a number', async () => {
        const res = await request(app).post('/api/archive/thesis');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(2);
    });

    test('should return a 401 error when the user is not a teacher', async () => {
        db.getRole.mockResolvedValueOnce(student);

        const res = await request(app).post('/api/archive/thesis').send(deleteThesisBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: "Unauthorized" });
    });

    test('hould return a 400 when called on a thesis for which the teacher is not the supervisor', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.getThesisSupervisor.mockResolvedValueOnce("notSupervisor");

        const res = await request(app).post('/api/archive/thesis').send(deleteThesisBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledWith(deleteThesisBody.thesisID);
        expect(db.checkExistenceThesis).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'The teacher does not have the permission to archive the thesis' });
    });

    test('hould return a 400 when called on a thesis deleted', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.getThesisSupervisor.mockResolvedValueOnce(teacher.id);
        db.checkExistenceThesis.mockResolvedValueOnce({});


        const res = await request(app).post('/api/archive/thesis').send(deleteThesisBody);

        performCommonAssertionsArchive(res);
    });

    test('hould return a 400 when called on a thesis already archived', async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.getThesisSupervisor.mockResolvedValueOnce(teacher.id);
        db.checkExistenceThesis.mockResolvedValueOnce({ available: 1, data: { state: 0 } });


        const res = await request(app).post('/api/archive/thesis').send(deleteThesisBody);

        performCommonAssertionsArchive(res);
    });

    test('should return a 503 error when an error occurs', async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/archive/thesis').send(deleteThesisBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getThesisSupervisor).toHaveBeenCalledTimes(0);
        expect(db.archiveThesis).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: "Error in archiving the thesis" });
    });
})

const setupAppMocks = (cvData) => {
    db.getVirtualDate.mockResolvedValueOnce(0);
    db.getRole.mockResolvedValueOnce(teacher);
    db.checkExistenceApplicationById.mockResolvedValueOnce(tmpApp);
    db.getStudentInfo.mockResolvedValueOnce(student);
    db.getStudentExams.mockResolvedValueOnce(exams);
    db.getCv.mockResolvedValueOnce(cvData);
};

const performCommonAssertionsAppDetails = (res, expectedBody) => {
    expect(db.getVirtualDate).toHaveBeenCalledTimes(1);
    expect(db.getRole).toHaveBeenCalledTimes(1);
    expect(db.checkExistenceApplicationById).toHaveBeenCalledTimes(1);
    expect(db.checkExistenceApplicationById).toHaveBeenCalledWith(detailBody.idApplication, 0);
    expect(db.getStudentInfo).toHaveBeenCalledTimes(1);
    expect(db.getStudentInfo).toHaveBeenCalledWith(tmpApp.student);
    expect(db.getStudentExams).toHaveBeenCalledTimes(1);
    expect(db.getStudentExams).toHaveBeenCalledWith(tmpApp.student);
    expect(db.getCv).toHaveBeenCalledTimes(1);
    expect(db.getCv).toHaveBeenCalledWith(detailBody.idApplication);
    expect(res.status).toBe(200);
    expect(res.body).toEqual(expectedBody);
};

describe('POST Application Details', () => {
    test(`should retrive student'info correctly without the cv`, async () => {
        setupAppMocks({ filename: null })

        const res = await request(app).post('/api/applications/details').send(detailBody);
        performCommonAssertionsAppDetails(res, {"exams": exams, "id": student.id, "role": student.role, "state":tmpApp.state});
    });

    test(`should retrive student'info correctly with the cv`, async () => {
        setupAppMocks({ filename: "notNull", path: "path" });

        const res = await request(app).post('/api/applications/details').send(detailBody);
        performCommonAssertionsAppDetails(res, {"cv": "path", "exams": exams, "id": student.id, "role": student.role, "state": tmpApp.state});
    });

    test(`should return a 422 error when the idApplication is not a number`, async () => {
        const res = await request(app).post('/api/applications/details');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.getStudentExams).toHaveBeenCalledTimes(0);
        expect(db.getCv).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(2);
    });

    test(`should return a 401 error when the user is not a teacher`, async () => {
        db.getRole.mockResolvedValueOnce(student);

        const res = await request(app).post('/api/applications/details').send(detailBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplicationById).toHaveBeenCalledTimes(0);
        expect(db.getStudentExams).toHaveBeenCalledTimes(0);
        expect(db.getCv).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: "Unauthorized" });
    });

    test(`should return a 400 error when the application does not exist`, async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkExistenceApplicationById.mockResolvedValueOnce(0);

        const res = await request(app).post('/api/applications/details').send(detailBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplicationById).toHaveBeenCalledTimes(1);
        expect(db.getStudentExams).toHaveBeenCalledTimes(0);
        expect(db.getCv).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: "Application does not exists" });
    });

    test(`should return a 503 error when an error occurs`, async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/applications/details').send(detailBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkExistenceApplicationById).toHaveBeenCalledTimes(0);
        expect(db.getStudentExams).toHaveBeenCalledTimes(0);
        expect(db.getCv).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({error: "GetStudentInfo error"});
    });
})

describe('POST Insert Request', () => {
    test(`should correctly insert a request`, async () => {
        db.getRole.mockResolvedValueOnce(student);
        db.checkPendingStudentRequests.mockResolvedValueOnce(false);
        db.getStudentApplications.mockResolvedValueOnce([]);
        db.insertRequest.mockResolvedValueOnce(1);
        db.insertCoSupervisorRequest.mockResolvedValue();

        const res = await request(app).post('/api/insert/request').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkPendingStudentRequests).toHaveBeenCalledTimes(1);
        expect(db.getStudentApplications).toHaveBeenCalledTimes(1);
        expect(db.insertRequest).toHaveBeenCalledTimes(1);
        expect(db.insertCoSupervisorRequest).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
        expect(res.body).toEqual("Insert request successful")
    });

    test(`should return a 401 error when the user is not a student`, async () => {
        db.getRole.mockResolvedValueOnce(teacher);

        const res = await request(app).post('/api/insert/request').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkPendingStudentRequests).toHaveBeenCalledTimes(0);
        expect(db.insertRequest).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test(`should return a 400 error when the student already has a pending request`, async () => {
        db.getRole.mockResolvedValueOnce(student);
        db.checkPendingStudentRequests.mockResolvedValueOnce(true);
        db.getStudentApplications.mockResolvedValueOnce([]);

        const res = await request(app).post('/api/insert/request').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkPendingStudentRequests).toHaveBeenCalledTimes(1);
        expect(db.insertRequest).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Pending or accepted application or requests already exists' });
    });

    test(`should return a 400 error when the student already has a pending application`, async () => {
        db.getRole.mockResolvedValueOnce(student);
        db.checkPendingStudentRequests.mockResolvedValueOnce(false);
        db.getStudentApplications.mockResolvedValueOnce([{state: 1}]);

        const res = await request(app).post('/api/insert/request').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkPendingStudentRequests).toHaveBeenCalledTimes(1);
        expect(db.insertRequest).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(400);
        expect(res.body).toEqual({ error: 'Pending or accepted application or requests already exists' });
    });

    test(`should return a 503 error when an error occurs`, async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/insert/request').send(thesis1);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.insertRequest).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the insertion of the request' });
    });

    test(`should return a 422 error when called without something in the body`, async () => {

        const res = await request(app).post('/api/insert/request');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.insertRequest).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(6);
    });
});

describe('POST Approve secretary', () => {
    test(`should correctly approve a request by secretary`, async () => {
    
        db.getRole.mockResolvedValueOnce(secretary);
        db.checkRequestExistance.mockResolvedValueOnce(1);
        db.approveRequestSecretary.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/approve/request/secretary').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.approveRequestSecretary).toHaveBeenCalledTimes(1);
        expect(db.approveRequestSecretary).toHaveBeenCalledWith(requestBody.requestID);
        expect(res.status).toBe(200);
    });

    test(`should return a 500 error when request does not exist`, async () => {
    
        db.getRole.mockResolvedValueOnce(secretary);
        db.checkRequestExistance.mockResolvedValueOnce(0);

        const res = await request(app).post('/api/approve/request/secretary').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Request does not exists' });
    });

    test(`should return a 401 error when the user is not secretary`, async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/approve/request/secretary').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.approveRequestSecretary).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test(`should return a 503 error when an error occurs`, async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/approve/request/secretary').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.approveRequestSecretary).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the process to approve request by secretary' });
    });

    test(`should return a 422 error when called without something in the body`, async () => {

        const res = await request(app).post('/api/approve/request/secretary');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.approveRequestSecretary).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });
});    

describe('POST Reject secretary', () => {
    test(`should correctly reject a request by secretary`, async () => {
    
        db.getRole.mockResolvedValueOnce(secretary);
        db.checkRequestExistance.mockResolvedValueOnce(1);
        db.rejectRequestSecretary.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/reject/request/secretary').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.rejectRequestSecretary).toHaveBeenCalledTimes(1);
        expect(db.rejectRequestSecretary).toHaveBeenCalledWith(requestBody.requestID);
        expect(res.status).toBe(200);
    });

    test(`should return a 500 error when the request does not exist`, async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(0);

        const res = await request(app).post('/api/reject/request/secretary').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.rejectRequestSecretary).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Request does not exists' });
    });

    test(`should return a 401 error when the user is not secretary`, async () => {
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/reject/request/secretary').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.rejectRequestSecretary).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test(`should return a 503 error when an error occurs`, async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/reject/request/secretary').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.rejectRequestSecretary).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the process to reject request by secretary' });
    });

    test(`should return a 422 error when called without something in the body`, async () => {

        const res = await request(app).post('/api/reject/request/secretary');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.rejectRequestSecretary).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });
});    

describe('POST Approve professor', () => {
    test(`should correctly approve a request by professor`, async () => {
    
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(1);
        db.approveRequestTeacher.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/approve/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.approveRequestTeacher).toHaveBeenCalledTimes(1);
        expect(db.approveRequestTeacher).toHaveBeenCalledWith(requestBody.requestID, currentDate.format("YYYY-MM-DD"));
        expect(res.status).toBe(200);
    });

    test(`should return a 500 error when request does not exist`, async () => {
    
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(0);

        const res = await request(app).post('/api/approve/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Request does not exists' });
    });

    test(`should return a 401 error when the user is not teacher`, async () => {
        db.getRole.mockResolvedValueOnce(student);
        db.checkRequestExistance.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/approve/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.approveRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test(`should return a 503 error when an error occurs`, async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/approve/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.approveRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the process to approve request by professor' });
    });

    test(`should return a 422 error when called without something in the body`, async () => {

        const res = await request(app).post('/api/approve/request/professor');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.approveRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });
});

describe('POST Reject professor', () => {
    test(`should correctly approve a request by professor`, async () => {
    
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(1);
        db.rejectRequestTeacher.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/reject/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.rejectRequestTeacher).toHaveBeenCalledTimes(1);
        expect(db.rejectRequestTeacher).toHaveBeenCalledWith(requestBody.requestID);
        expect(res.status).toBe(200);
    });

    test(`should return a 500 error when request does not exist`, async () => {
    
        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(0);

        const res = await request(app).post('/api/reject/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(res.status).toBe(500);
        expect(res.body).toEqual({ error: 'Request does not exists' });
    });

    test(`should return a 401 error when the user is not teacher`, async () => {
        db.getRole.mockResolvedValueOnce(student);
        db.checkRequestExistance.mockResolvedValueOnce(1);

        const res = await request(app).post('/api/reject/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.rejectRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test(`should return a 503 error when an error occurs`, async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/reject/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.rejectRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the process to reject request by professor' });
    });

    test(`should return a 422 error when called without something in the body`, async () => {

        const res = await request(app).post('/api/reject/request/professor');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.approveRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(1);
    });
});

describe('GET Requests', () => {
    test(`should correctly retrieve requests to a teacher`, async () => {

        db.getRole.mockResolvedValueOnce(teacher);
        db.getTeacherRequests.mockResolvedValueOnce(requests);
        db.getRequestCoSup.mockResolvedValue(thesis1.co_supervisors);
        db.getStudentInfo.mockResolvedValue(thesis1.co_supervisors[0]);
        db.getTeacher.mockResolvedValue(thesis1.co_supervisors[0]);
        
        const res = await request(app).get('/api/requests');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getTeacherRequests).toHaveBeenCalledTimes(1);
        expect(db.getTeacherRequests).toHaveBeenCalledWith(teacher.id);
        expect(db.getRequestCoSup).toHaveBeenCalledTimes(2);
        expect(db.getStudentInfo).toHaveBeenCalledTimes(2);
        expect(db.getTeacher).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
    });

    test(`should correctly retrieve requests to secretary`, async () => {

        db.getRole.mockResolvedValueOnce(secretary);
        db.getSecretaryRequests.mockResolvedValueOnce(requests);
        db.getRequestCoSup.mockResolvedValue(thesis1.co_supervisors);
        db.getStudentInfo.mockResolvedValue(thesis1.co_supervisors[0]);
        db.getTeacher.mockResolvedValue(thesis1.co_supervisors[0]);
        
        const res = await request(app).get('/api/requests');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getSecretaryRequests).toHaveBeenCalledTimes(1);
        expect(db.getRequestCoSup).toHaveBeenCalledTimes(2);
        expect(db.getStudentInfo).toHaveBeenCalledTimes(2);
        expect(db.getTeacher).toHaveBeenCalledTimes(2);
        expect(res.status).toBe(200);
    });

    test(`should correctly retrieve requests to a student`, async () => {

        db.getRole.mockResolvedValueOnce(student);
        db.getStudentRequests.mockResolvedValueOnce([]);
        
        const res = await request(app).get('/api/requests');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.getStudentRequests).toHaveBeenCalledTimes(1);
        expect(db.getStudentRequests).toHaveBeenCalledWith(student.id);
        expect(db.getRequestCoSup).toHaveBeenCalledTimes(0);
        expect(db.getStudentInfo).toHaveBeenCalledTimes(0);
        expect(db.getTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(200);
    });

    test(`should return a 401 error when the user is not Authorized`, async () => {
        db.getRole.mockResolvedValueOnce({role: "Unknown"});

        const res = await request(app).get('/api/requests');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({error: "Unauthorized user"});
    });

    test(`should return a 503 error when an error occurs`, async () => {
        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).get('/api/requests');

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({error: "Error get Requests"});
    });
});

describe('POST Request Change Professor', () => {
    test(`should correctly apply request change for a teacher`, async () => {

        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(true);
        db.changeRequestTeacher.mockResolvedValueOnce();

        const res = await request(app).post('/api/change/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.changeRequestTeacher).toHaveBeenCalledTimes(1);
        expect(db.changeRequestTeacher).toHaveBeenCalledTimes(requestBody.requestID, requestBody.notes);
        expect(res.status).toBe(200);
        expect(res.body).toEqual("Request change completed by professor");
    });

    test(`should return a 401 error when the user is not a teacher`, async () => {

        db.getRole.mockResolvedValueOnce(student);

        const res = await request(app).post('/api/change/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(0);
        expect(db.changeRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(401);
        expect(res.body).toEqual({ error: 'Unauthorized user' });
    });

    test(`should return a 404 error when the request does not exist`, async () => {

        db.getRole.mockResolvedValueOnce(teacher);
        db.checkRequestExistance.mockResolvedValueOnce(false);

        const res = await request(app).post('/api/change/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledWith(requestBody.requestID);
        expect(db.changeRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(404);
        expect(res.body).toEqual({ error: 'Request does not exists' });
    });

    test(`should return a 503 error when an error occurs`, async () => {

        db.getRole.mockRejectedValueOnce(genericError);

        const res = await request(app).post('/api/change/request/professor').send(requestBody);

        expect(db.getRole).toHaveBeenCalledTimes(1);
        expect(db.checkRequestExistance).toHaveBeenCalledTimes(0);
        expect(db.changeRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(503);
        expect(res.body).toEqual({ error: 'Error in the process to request change by professor' });
    });

    test(`should return a 422 when there is any error in the body`, async () => {

        const res = await request(app).post('/api/change/request/professor');

        expect(db.getRole).toHaveBeenCalledTimes(0);
        expect(db.changeRequestTeacher).toHaveBeenCalledTimes(0);
        expect(res.status).toBe(422);
        expect(res.body.errors).toHaveLength(2);
    });
});