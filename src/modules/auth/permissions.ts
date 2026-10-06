// File: permissions.ts
// Folder: src/modules/auth
// Role: Single source of truth for Role-Based Access Control (RBAC)

import { Role } from "@/generated/prisma"; // Adjusted to match your folder structure

export const Permissions = {
  isSuperAdmin(role: Role): boolean {
    return role === Role.SUPERADMIN;
  },

  canManageUsers(role: Role): boolean {
    // Explicitly typing this array as Role[] resolves the TS error
    const allowedRoles: Role[] = [Role.SUPERADMIN, Role.ADMIN];
    return allowedRoles.includes(role);
  },

  canManagePosts(role: Role): boolean {
    const allowedRoles: Role[] = [Role.SUPERADMIN, Role.ADMIN, Role.EDITOR];
    return allowedRoles.includes(role);
  },

  canManageCategories(role: Role): boolean {
    const allowedRoles: Role[] = [Role.SUPERADMIN, Role.ADMIN, Role.EDITOR];
    return allowedRoles.includes(role);
  },

  isReadOnly(role: Role): boolean {
    return role === Role.REVIEWER;
  },
};
