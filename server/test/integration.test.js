const request = require('supertest');
const { app } = require('../index.js');
const sqlite3 = require('sqlite3');
//const dbModule = require('../db.js');
const insert = require('./insert4test.js')
jest.mock('express-oauth2-jwt-bearer', () => ({
    auth: jest.fn(() => (_, __, next) => next()),
}));

beforeAll(async () => {
    await insert.createTestDb();
});

describe('GET Keywords', () => {
    test('should return a non-empty list when retrieving a list of keywords', async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(insert.insertKeyword(i));
        }
        
        await Promise.all(insertPromises);

        const res = await request(app).get('/api/keywords');
        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(expect.arrayContaining(["keyword0", "keyword1", "keyword2"]));
    });
});

describe('GET Types', () => {
    test('should return a non-empty list when retrieving a list of types', async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(insert.insertType(i));
        }
        
        await Promise.all(insertPromises);

        const res = await request(app).get('/api/types');

        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(expect.arrayContaining(["type0", "type1", "type2"]));
    });
});

describe('GET Teachers', () => {
    test('should return a non-empty list when retrieving a list of teachers', async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(insert.insertTeacher(i));
        }
        
        await Promise.all(insertPromises);
        
        const res = await request(app).get('/api/teachers');

        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(expect.arrayContaining([
            {ID: "0", name: "name0", surname: "surname0", email: "email0"},
            {ID: "1", name: "name1", surname: "surname1", email: "email1"},
            {ID: "2", name: "name2", surname: "surname2", email: "email2"},
          ]));
     });
});

describe('GET Cds', () => {
    test('should return a non-empty list when retrieving a list of cds', async () => {
        const insertPromises = [];
        for (let i = 0; i < 3; i++) {
            insertPromises.push(insert.insertDegree(i));
        }
        
        await Promise.all(insertPromises);

        const res = await request(app).get('/api/cds');

        expect(res.status).toBe(200);
        expect(res.body).not.toHaveLength(0);
        expect(res.body).toEqual(expect.arrayContaining([
            {cod_degree: "cod_deg0", title_degree: "title0"},
            {cod_degree: "cod_deg1", title_degree: "title1"},
            {cod_degree: "cod_deg2", title_degree: "title2"},
          ]));
    });
});
