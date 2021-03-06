const {randomName, createUser, loginUser, client} = require("./helpers");
const expect = require("chai").expect;

beforeEach(async () => {
  // setup
  const username = randomName();
  await createUser(username);

  // given
  await loginUser(username);
});

describe("Notebook routes", () => {
  it("can create a new notebook", async () => {
    // when
    const response = await client.post("/notebook", { name: randomName(), description: ""});

    // then
    expect(response.status).to.equal(200);
  });

  it("can get all notebooks", async () => {
    // setup
    const name = randomName();

    // given
    await client.post("/notebook", { name, description: ""});

    // when
    const response = await client.get("/notebook");

    const data = response.data;

    // then
    expect(data).lengthOf(1);

    expect(data[0].name).to.equal(name);
  });

  it("can delete a notebook", async () => {
    // setup
    const name = randomName();

    // given
    await client.post("/notebook", { name, description: ""});

    const notebook = await client.get("/notebook");

    const data = notebook.data;

    // when
    const response = await client.delete(`/notebook/${data[0].uuid}`);

    // then
    expect(response.status).to.equal(200);

    try {
      await client.get(`/notebook/${data[0].uuid}`);
      fail("expected error");
    } catch(e) {
      expect(e.response.status).to.equal(404);
    }
  });
});
