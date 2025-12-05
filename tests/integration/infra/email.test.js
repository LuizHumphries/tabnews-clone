import email from "infra/email";
import orchestrator from "tests/orchestrator";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

beforeEach(async () => {
  await orchestrator.deleteAllEmails();
});

describe("infra/email.js", () => {
  test("send", async () => {
    await email.send({
      from: "FinTab <contato@fintab.com.br>",
      to: "contato@curso.dev",
      subject: "Teste de assunto",
      text: "Teste de corpo.",
    });

    await email.send({
      from: "FinTab <contato@fintab.com.br>",
      to: "contato@curso.dev",
      subject: "EMAIL FINAL",
      text: "CORPO DO ULTIMO EMAIL.",
    });

    const lastEmail = await orchestrator.getLastEmail();

    expect(lastEmail.sender).toBe("<contato@fintab.com.br>");
    expect(lastEmail.recipients[0]).toBe("<contato@curso.dev>");
    expect(lastEmail.subject).toBe("EMAIL FINAL");
    expect(lastEmail.text).toBe("CORPO DO ULTIMO EMAIL.\n");
  });
});
