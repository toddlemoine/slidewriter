import React from "react";
import { enabled } from "../../featureFlags";

const ENABLED = enabled("swio-user");

export default function UserFeatureFlag({ children }) {
  return ENABLED ? children : null;
}
