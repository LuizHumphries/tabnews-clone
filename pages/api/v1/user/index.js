import controller from "infra/controller";
import session from "models/session";
import user from "models/users";

const { createRouter } = require("next-connect");

const router = createRouter();

router.get(getHandler);

export default router.handler(controller.errorHandlers);

async function getHandler(request, response) {
  const sessionToken = request.cookies.session_id;
  const validSession = await session.findOneValidByToken(sessionToken);
  const renewedSessionObject = await session.renew(validSession.id);

  controller.setSessionCookie(renewedSessionObject.token, response);

  const userFound = await user.findOneById(validSession.user_id);
  response.setHeader("Cache-Control", "no-store, max-age=0, must-revalidate");

  return response.status(200).json(userFound);
}
