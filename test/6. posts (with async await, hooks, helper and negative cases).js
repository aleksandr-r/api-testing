import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
//const id = "";

import { expect } from 'chai';
import { describe, it } from 'mocha';
import { createRandomUser } from '../helper/user_helper';

const TOKEN = '57868a47750911e88bd82b4b8c40aa1678a650b5ee3aedd28752ebdee23a4593';


describe('User Posts', () => {
    let postId, userId

    before(async () => {
        userId = await createRandomUser();

    });
    describe('Negative tests', () => {
        it('401 Auth failed', async () => {
            const data = {
                user_id: userId,
                title: "okojjiji",
                body: "some body"
            };//creating the data

            const postRes = await request
                .post('posts')
                //.set('Authorization', `Bearer ${TOKEN}`)
                .send(data)//creating the request

            expect(postRes.body.code).to.eq(401);
            expect(postRes.body.data.message).to.eq('Authentication failed');
            //console.log(postRes)
        });
        it('422 Validation failed', async () => {
            const data = {
                user_id: userId,
                title: "okojjiji",
                //body: "some body"
            };//creating the data

            const postRes = await request
                .post('posts')
                .set('Authorization', `Bearer ${TOKEN}`)
                .send(data)//creating the request
            console.log(postRes.body)
            expect(postRes.body.code).to.eq(422);
            expect(postRes.body.data[0].field).to.eq('body');
            expect(postRes.body.data[0].message).to.eq("can't be blank" );
            //console.log(postRes)
        });
    });
});
