import Organizer from 'App/Models/Organizer/Organizer';
import test from 'japa';
import { post, get, destroy, auth } from '../test-helpers';

test.group('Creating an organizer', () => {
  test.skip('fails for unauthenticated users', async (assert) => {
    await post('/v1/organizer/').send({}).expect(401);
  });

  test.skip('fails with unsufficient data and provides validation errors', async (assert) => {
    const response = await post('/v1/organizer/')
      .set('Authorization', `Bearer ${await auth()}`)
      .send({})
      .expect(422);
    assert.lengthOf(response.body.errors, 1);
  });

  test.skip('works for authenticated users with valid data', async (assert) => {
    const response = await post('/v1/organizer/')
      .set('Authorization', `Bearer ${await auth()}`)
      .send({
        attributes: {
          name: 'Technologiestiftung Berlin',
        },
      })
      .expect(200);

    const organizer = response.body.data.attributes;
    assert.equal(organizer.name, 'Technologiestiftung Berlin');
  });
});

test.group('Listing organizers', () => {
  test.skip('fails for unauthenticated users', async (assert) => {
    await get('/v1/organizer/')
      .set('Authorization', `Bearer ${await auth()}`)
      .expect(403);
  });

  test.skip('works for authenticated users', async (assert) => {
    await get('/v1/organizer/')
      .set('Authorization', `Bearer ${await auth()}`)
      .expect(200);
  });
});

test.group('Showing details for an organizer', () => {
  test.skip('works for unauthenticated users', async (assert) => {
    const organizer = await Organizer.first();
    const response = await get(`/v1/organizer/${organizer.publicId}`).expect(
      200
    );

    assert.equal(
      response.body.data.attributes.name,
      'Technologiestiftung Berlin'
    );
  });

  test.skip('works for authenticated users', async (assert) => {
    const organizer = await Organizer.first();
    const response = await get(`/v1/organizer/${organizer.publicId}`)
      .set('Authorization', `Bearer ${await auth()}`)
      .expect(200);

    assert.equal(
      response.body.data.attributes.name,
      'Technologiestiftung Berlin'
    );
  });
});

test.group('Destroying organizers', () => {
  test.skip('fails for unauthenticated users', async (assert) => {
    const organizer = await Organizer.first();
    await destroy(`/v1/organizer/${organizer.publicId}`).expect(401);
  });

  test.skip('works for authenticated users', async (assert) => {
    const organizer = await Organizer.first();
    await destroy(`/v1/organizer/${organizer.publicId}`)
      .set('Authorization', `Bearer ${await auth()}`)
      .expect(200);
  });
});
