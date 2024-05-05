import queryString from "query-string";

export default function getVerificationCodeFromLocation(location) {
  return queryString.parse(location.search).code;
}
