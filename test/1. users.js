import supertest from 'supertest';
const request = supertest('https://gorest.co.in/public-api/');
//const id = "";

import { expect } from 'chai';

const TOKEN = '57868a47750911e88bd82b4b8c40aa1678a650b5ee3aedd28752ebdee23a4593';

describe.skip('Users', () => { //==============x uzdetas, kad skippintu
    //=================================================================GET
    it('GET /users', (done) => {
        request.get(`users?access-token=${TOKEN}`).end((err, res) => {
            //console.log(err);
            //console.log(res.body);
            expect(res.body.data).to.not.be.empty;
            done();
        });
    });
    it('GET /users 2nd option', () => {
        return request.get(`users?access-token=${TOKEN}`).then((res) => {
            expect(res.body.data).to.not.be.empty;
        });
    });
    it('GET first ID', () => {
        return request.get(`users/?access-token=${TOKEN}`).then((res) => {

            console.log(res.body.data[0].id);

        });
    });
    it('GET /users/:id', () => {
        return request.get(`users/686981?access-token=${TOKEN}`).then((res) => {

            //console.log(res.body);
            expect(res.body.data.id).to.be.eq(686981)
        });
    });
    it('GET /users with query params', () => {
        const url = `users?access-token=${TOKEN}&gender=female&status=active`
        return request.get(url).then((res) => {

            //console.log(res.body);
            expect(res.body.data).to.not.be.empty;
            res.body.data.forEach(data => {
                expect(data.gender).to.eq('female');
                expect(data.status).to.eq('active');
            })
        });
    });

    //=========================================POST
    it('Post /users', () => {
        const data = {
            email: `asaas${Math.floor(Math.random() * 9999)}@edede.ee`,
            name: 'eefeded',
            gender: 'male',
            status: 'inactive'
        };
        return request
            .post('users')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                expect(res.body.data.email).to.eq(data.email)
                expect(res.body.data.status).to.eq(data.status)
                expect(res.body.data).to.deep.include(data); //cia kai patikriname visa bloka informcijos
                console.log(res.body);
            })
    });
    //===========================================PUT
    it('PUT /users/:id', () => {
        const data = {
            status: "active",
            name: `One + ${Math.floor(Math.random() * 9999)}`
        }
        return request
            .put('users/715156')
            .set('Authorization', `Bearer ${TOKEN}`)
            .send(data)
            .then((res) => {
                console.log(res.body)
                expect(res.body.data).to.deep.include(data);
            });

    });
    ////===========================================DELETE
    it('DELETE user', () => {
        return request
            .delete('users/715156')
            .set('Authorization', `Bearer ${TOKEN}`)
            .then((res) => {
                console.log(res.body);
                expect(res.body.data).to.be.eq(null);
            });

    });

});

