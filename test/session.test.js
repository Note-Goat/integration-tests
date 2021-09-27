const {createUser, randomName, client, loginUser} = require("./helpers");
const expect = require("chai").expect;

describe('Session routes', () => {
  it('POST /session success sanity check', async () => {
    // setup
    const username = randomName();

    // given
    await createUser(username);

    // when
    const session = await client.post("/session", {
      username,
      password: "bar",
    });

    // then
    expect(session.status).to.equal(200);
  });

  it('GET /session success sanity check', async () => {
    // setup
    const username = randomName();
    await createUser(username);

    // given
    await loginUser(username);

    // when
    const session = await client.get("/session");

    // then
    expect(session.status).to.equal(200);
  });
});
