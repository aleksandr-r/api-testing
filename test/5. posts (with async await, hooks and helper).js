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
        userId = await createRandomUser ();

    });
    it('/posts', async () => {

        const data = {
            user_id: userId,
            title: "okojjiji",
            body: "some body"
        };//creating the data

        const postRes = await request
            .post('posts')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)//creating the request

        console.log(postRes.body);
        expect(postRes.body.data).to.deep.include(data);
        postId = postRes.body.data.id //verifing the result
        //console.log(postId)
    });


    it('GET /posts/:id', async () => {
        await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200);
        //console.log(request)
    });
});
