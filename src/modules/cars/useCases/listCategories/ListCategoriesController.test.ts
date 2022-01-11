import { app } from "@shared/infra/http/app";
import request from "supertest";
import { v4 as uuidV4 } from "uuid";

import createConnection from "@shared/infra/typeorm";
import { Connection } from "typeorm";
import { hash } from "bcrypt";

let connection: Connection;
describe("List Categories Controller", () => {
  beforeAll(async () => {
    connection = await createConnection();
    await connection.runMigrations();

    const id = uuidV4();
    const password = await hash("admin", 8);

    await connection.query(
      `INSERT INTO users (id, name, email, password, "isAdmin", created_at, driver_license)
      values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'xxxxx')`
    );
  });

  afterAll(async () => {
    await connection.dropDatabase();
    await connection.close();
  });

  it("should be able to list all categories", async () => {
    const {
      body: { token },
    } = await request(app).post("/sessions").send({
      email: "admin@rentx.com.br",
      password: "admin",
    });

    await request(app)
      .post("/categories")
      .send({
        name: "Category",
        description: "Category supertest description",
      })
      .set({
        Authorization: `Bearer ${token}`,
      });

    const response = await request(app).get("/categories");

    console.log(response.body);

    expect(response.status).toBe(200);
    expect(response.body[0]).toHaveProperty("id");
    expect(response.body[0].name).toEqual("Category");
  });
});
