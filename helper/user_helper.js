import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
const faker = require('faker')

const TOKEN = '57868a47750911e88bd82b4b8c40aa1678a650b5ee3aedd28752ebdee23a4593';


export const createRandomUserwithFaker = async () => {
    const userData = {
        email: faker.internet.email(),
        name: faker.name.firstName(),
        gender: 'male',
        status: 'inactive'
    };
    const res = await request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(userData)
    console.log(res.body)
    return res.body.data.id
};

export const createRandomUser = async () => {
    const userData = {
        email: `asaas${Math.floor(Math.random() * 9999)}@edede.ee`,
        name: 'eefeded',
        gender: 'male',
        status: 'inactive'
    };
    const res = await request
        .post('users')
        .set('Authorization', `Bearer ${TOKEN}`)
        .send(userData)

    return res.body.data.id
};