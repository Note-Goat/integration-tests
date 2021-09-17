const expect = require("chai").expect;
const {createUser, randomName} = require("./helpers");

describe('User routes', () => {
  it('POST /user success sanity check', async () => {
    // when
    const response = await createUser();

    // then
    expect(response.status).to.equal(200);
  });

  it('POST /user must have a unique username', async () => {
    // given
    const name = randomName();

    // when / then
    await createUser(name);
    try {
      await createUser(name);
    } catch(e) {
      expect(e.response.status).to.equal(400);
      return;
    }

    // fail if catch is not triggered
    throw new Error("Should have failed");
  });
});
