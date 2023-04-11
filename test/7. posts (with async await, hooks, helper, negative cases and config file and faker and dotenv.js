require('dotenv').config()


import request from '../config/common';
const faker = require ('faker')

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { createRandomUser, createRandomUserwithFaker } from '../helper/user_helper';

const TOKEN2 = process.env.USER_TOKEN;

describe('User Posts', () => {
    let postId, userId

    before(async () => {
        userId = await createRandomUserwithFaker();

    });
    describe('Negative tests', () => {
        it('401 Auth failed', async () => {
            const data = {
                user_id: userId,
                title: faker.lorem.sentence(),
                body: faker.lorem.paragraphs(),
            };//creating the data

            const postRes = await request
                .post('posts')
                //.set('Authorization', `Bearer ${TOKEN}`)
                .send(data)//creating the request
                console.log(data)

            expect(postRes.body.code).to.eq(401);
            expect(postRes.body.data.message).to.eq('Authentication failed');
            //console.log(postRes)
        });
        it.only('422 Validation failed', async () => {
            const data = {
                user_id: userId,
                title: "okojjiji",
                //body: "some body"
            };//creating the data

            const postRes = await request
                .post('posts')
                .set('Authorization', `Bearer ${TOKEN2}`)
                .send(data)//creating the request
            console.log(postRes.body)
            expect(postRes.body.code).to.eq(422);
            expect(postRes.body.data[0].field).to.eq('body');
            expect(postRes.body.data[0].message).to.eq("can't be blank" );
            //console.log(postRes)
        });
    });
});
