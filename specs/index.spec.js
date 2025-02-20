import supertest from "supertest";
import user from "../specs/user";
import config from "../specs/config";

describe('user', () => {
  describe('POST /Account/v1/Authorized', () => {
    test('Метод должен существовать', async () => {
      const res = await supertest('https://bookstore.demoqa.com')
          .post('/Account/v1/Authorized')
          .send({})

      expect(res.status).not.toEqual(404);
    })

    test('Авторизация должна проходить успешно с правильным логином и паролем', async () => {
      const res = await user.login(config.Credentials) 
      expect(res.status).toEqual(200);
      expect(typeof res.body.token).toEqual('string')
    })

    test('Авторизация должна возвращать статус с кодом ошибки если логин неверный', async () => {
      const res = await user.login({username: 'demo4', password: 'demo'})
      expect(res.status).toEqual(412);
      expect(res.body.code).toEqual(1011)
    })

    test('Авторизация должна возвращать статус с кодом ошибки если пароль неверный', async () => {
      const res = await user.login({username: 'demo', password: 'demo3'})
      expect(res.status).toEqual(412);
      expect(res.body.code).toEqual(1011)
    })
  })
<<<<<<< HEAD
  
  describe('POST /Account/v1/User', () => {
    test('Получение информации о пользователе', async() => {
      let token = await user.getAuthToken();
      console.log("token="+token);

      const login = await user.login(config.Credentials);
      token = login.body.token;
      console.log("token="+token);

      const res = await user.user(token);
      expect(res.status).toEqual(200)
      console.log(res)
    })
  })

  describe('DELETE /Account/v1/User', () => {
    test('Удаление пользователя', async() => {
      let token = await user.getAuthToken();
      console.log("token="+token);

      const login = await user.login(config.Credentials);
      token = login.body.token;
      console.log("token="+token);

      const data = await user.user(token);
      expect(data.status).toEqual(200)
      console.log(data)

      const res = await user.delete(token, data.body.userId);
      expect(res.status).toEqual(200)
      console.log(res)
    })
  })
 })
=======
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
>>>>>>> 04f3b8f783609820d0ed68e36fe65d34e753345f
