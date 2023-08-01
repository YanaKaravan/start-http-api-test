import supertest from "supertest";

describe('user', () => {
  describe('POST /api/v1/login', () => {
    test('Метод должен существовать', async () => {
      const res = await supertest('https://try.vikunja.io')
          .post('/api/v1/login')
          .send({})

      expect(res.status).not.toEqual(404);
    })

    test('Авторизация должна проходить успешно с правильным логином и паролем', async () => {
      const res = await supertest('https://try.vikunja.io')
          .post('/api/v1/login')
          .set('Accept', 'application/json')
          .send({username: 'demo', password: 'demo'})

      expect(res.status).toEqual(200);
      expect(typeof res.body.token).toEqual('string')
    })

    test('Авторизация должна возвращать статус с кодом ошибки если логин неверный', async () => {
      const res = await supertest('https://try.vikunja.io')
          .post('/api/v1/login')
          .set('Accept', 'application/json')
          .send({username: 'demo4', password: 'demo'})

      expect(res.status).toEqual(412);
      expect(res.body.code).toEqual(1011)
    })

    test('Авторизация должна возвращать статус с кодом ошибки если пароль неверный', async () => {
      const res = await supertest('https://try.vikunja.io')
          .post('/api/v1/login')
          .set('Accept', 'application/json')
          .send({username: 'demo', password: 'demo3'})


      expect(res.status).toEqual(412);
      expect(res.body.code).toEqual(1011)
    })
  })
})

describe('token', () => {
  describe('POST /api/v1/GenerateToken', () => {
    test('Метод должен существовать', async () => {
      const res = await supertest('https://bookstore.demoqa.com/swagger/')
          .post('/api/v1/GenerateToken')
          .send({})

      expect(res.status).not.toEqual(404);
    })

    test('Генерация токена успешно', async () => {
      const res = await supertest('https://bookstore.demoqa.com/swagger/')
          .post('/api/v1/GenerateToken')
          .set('Accept', 'application/json')
          .send({username: 'demotoken', password: 'demotoken'})

      expect(res.status).toEqual(200);
      expect(typeof res.body.token).toEqual('string')
    })

    test('Генерация токена c ошибкой', async () => {
      const res = await supertest('https://bookstore.demoqa.com/swagger/')
          .post('/api/v1/GenerateToken')
          .set('Accept', 'application/json')
          .send({username: 'demotoken5', password: 'demotoken'})

      expect(res.status).toEqual(400);
      expect(res.body.code).toEqual (0)
    })
  })
})