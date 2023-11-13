const request = require('supertest');
const { app, checkJwt } = require('../index.js');
const db = require('../db');

jest.mock('../db');
/*jest.mock("../index.js", () => {
  const originalModule = jest.requireActual("../index.js");
  return {
    
    ...originalModule,
    checkJwt: jest.fn(),
  };
});*/ // mock the middleware ?

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
    test('dummy test', async () => {

    });
});

describe('GET Teachers', () => {
    test('dummy test', async () => {

    });
});

describe('GET Cds', () => {
    test('dummy test', async () => {

    });
});

describe('GET Theses', () => {
    test('dummy test', async () => {

    });
});

describe('GET Groups', () => {
    test('dummy test', async () => {

    });
});

describe('Insert Thesis', () => {
    test('dummy test', async () => {

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