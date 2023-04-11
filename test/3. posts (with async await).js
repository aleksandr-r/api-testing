import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
//const id = "";

import { expect } from 'chai';
import { describe, it } from 'mocha';

const TOKEN = '57868a47750911e88bd82b4b8c40aa1678a650b5ee3aedd28752ebdee23a4593';


describe('User Posts', () => {
    let postId, userId
    it('/posts', async () => {

        const userData = {
            email: `asaas${Math.floor(Math.random() * 9999)}@edede.ee`,
            name: 'eefeded',
            gender: 'male',
            status: 'inactive'
        };
        return request
            .post('users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(userData)
            .then(async (res) => {
                //expect(res.body.data.email).to.eq(data.email)
                //expect(res.body.data.status).to.eq(data.status)
                expect(res.body.data).to.deep.include(userData); 
                //console.log(res.body);
                userId = res.body.data.id
                //console.log(userId)

                const data = {
                    user_id: userId,
                    title: "okojjiji",
                    body: "some body"
                };
        
                const postRes = await request
                    .post('posts')
                    .set('Authorization', `Bearer ${TOKEN}`)
                    .send(data)
                console.log(postRes.body);
                expect(postRes.body.data).to.deep.include(data);
                postId = postRes.body.data.id
                //console.log(postId)
            });

        
    });

    it('GET /posts/:id', async () => {
        await request
            .get(`posts/${postId}`)
            .set('Authorization', `Bearer ${TOKEN}`)
            .expect(200);
        //console.log(request)
    });
});