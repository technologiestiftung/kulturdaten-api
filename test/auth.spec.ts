import test from 'japa';
import { post, get, auth } from '../test-helpers';
import User from 'App/Models/User';
import { UserStatus } from 'App/Models/User';
import Mail from '@ioc:Adonis/Addons/Mail';

test.group('Registering as a new user', () => {
  test('fails without any data and provides validation errors', async (assert) => {
    const response = await post('/auth/register/').send({}).expect(422);
    assert.lengthOf(response.body.errors, 2);
  });

  test('fails with unsufficient data and provides validation errors', async (assert) => {
    const response = await post('/auth/register/')
      .send({ email: `user+${Date.now()}@kulturdaten.berlin` })
      .expect(422);
    assert.lengthOf(response.body.errors, 1);
  });

  test('adds one to the database and sends opt-in mail', async (assert) => {
    const inbox = new Promise((resolve) => {
      Mail.trap((message) => {
        resolve(message);
      });
    });

    const email = `user+${Date.now()}@kulturdaten.berlin`;
    const password = `${Date.now()}`;

    const response = await post('/auth/register/')
      .send({
        email,
        password,
        passwordConfirmation: password,
      })
      .expect(200);

    const message = await inbox;
    const user = await User.findByOrFail(
      'email',
      response.body.data.attributes.email
    );

    assert.equal(user.email, email);
    assert.equal(response.body.data.attributes.email, user.email);
    assert.equal(message.to[0].address, email);

    Mail.restore();
  });
});

test.group('Unauthenticated users', (group) => {
  test('can not fetch user info', async (assert) => {
    await post('/auth/info/').expect(401);
  });

  test('can validate a token', async (assert) => {
    const response = await post('/auth/validate/').expect(200);
    assert.isFalse(response.body.meta.valid);
  });
});

test.group('Logging in', () => {
  test('fails without any data and provides validation errors', async (assert) => {
    const response = await post('/auth/login/').send({}).expect(422);
    assert.lengthOf(response.body.errors, 2);
  });

  test('fails with unsufficient data and provides validation errors', async (assert) => {
    const response = await post('/auth/login/')
      .send({ email: 'user@kulturdaten.berlin' })
      .expect(422);
    assert.lengthOf(response.body.errors, 1);
  });

  test('fails for an unverified user', async (assert) => {
    const email = `user+${Date.now()}@kulturdaten.berlin`;
    const password = `${Date.now()}`;

    const user = await User.create({ email, password });

    const response = await post('/auth/login/')
      .send({ email, password })
      .expect(428);
  });

  test('as a verified user returns an auth token', async (assert) => {
    const email = `user+${Date.now()}@kulturdaten.berlin`;
    const password = `${Date.now()}`;

    const user = await User.create({
      email,
      password,
      status: UserStatus.ACTIVE,
    });

    const response = await post('/auth/login/')
      .send({
        email,
        password,
      })
      .expect(200);

    assert.isString(response.body.meta.token.token);
  });
});

test.group('Authenticated users', (group) => {
  test('can fetch their info', async (assert) => {
    const response = await post('/auth/info/')
      .set('Authorization', `Bearer ${await auth()}`)
      .expect(200);

    assert.isString(response.body.data.attributes.email);
  });

  test('can validate their token', async (assert) => {
    const response = await post('/auth/validate/')
      .set('Authorization', `Bearer ${await auth()}`)
      .expect(200);

    assert.isTrue(response.body.meta.valid);
  });

  test('can log out', async (assert) => {
    await post('/auth/logout/')
      .set('Authorization', `Bearer ${await auth(true)}`)
      .expect(200);
  });
});
