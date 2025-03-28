import { createAccessControl } from "better-auth/plugins/access";
import { defaultStatements, adminAc } from "better-auth/plugins/admin/access";

export const ROLES = {
  USER: "user",
  ADMIN: "admin",
  SUPER_ADMIN: "super_admin",
} as const;

/**
 * make sure to use `as const` so typescript can infer the type correctly
 */
export const statement = {
  ...defaultStatements,
  garden: ["create", "share", "update", "delete"],
} as const;

export const accessControl = createAccessControl(statement);

export const userRole = accessControl.newRole({
  garden: ["create"],
});

export const adminRole = accessControl.newRole({
  ...adminAc.statements,
  garden: ["create", "update"],
});

export const superAdminRole = accessControl.newRole({
  ...adminAc.statements,
  user: ["ban"],
  garden: ["create", "update", "delete"],
});
