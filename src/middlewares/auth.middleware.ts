export const authMiddleware = (event: any) => {
  const token = event.headers.Authorization;

  const pk_default = "pk_test_LsRBKejzCOEEWOsw";

  const tokenRegex = /^pk_test_[A-Za-z0-9]{16}$/;
  let messageError = "";
  const [prefix, authToken] = token.split(" ");
  if (!authToken || !tokenRegex.test(authToken) || prefix != "Bearer") {
    messageError = "Invalid authorization token";
    if (pk_default != authToken) {
      messageError += " for this function";
    }
  }
  if (messageError) throw new Error(messageError);
};
