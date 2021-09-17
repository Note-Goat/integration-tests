const {createUser, randomName, client, loginUser, getAccessTokenFromSetHeaders} = require("./helpers");
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

  it('DELETE /session success sanity check', async () => {
    // setup
    const username = randomName();
    await createUser(username);
    const response = await loginUser(username);
    expect(getAccessTokenFromSetHeaders(response.headers['set-cookie'])).not.to.equal("");

    // given
    const session = await client.delete("/session");

    expect(session.status).to.equal(200);
    expect(getAccessTokenFromSetHeaders(session.headers['set-cookie'])).to.equal("");
  });
});
