import { z } from "zod";
import { adminProcedure, createTRPCRouter } from "~/server/api/trpc";
import { authClient } from "~/lib/auth-client";

// Input validation schemas
const userCreateSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(["USER", "ADMIN"]).default("USER"),
});

const userUpdateSchema = z.object({
  userId: z.string(),
  role: z.enum(["USER", "ADMIN"]),
});

const userBanSchema = z.object({
  userId: z.string(),
  banReason: z.string().optional(),
  banExpiresIn: z.number().optional(),
});

const listUsersSchema = z.object({
  searchField: z.string().optional(),
  searchOperator: z.enum(["contains", "starts_with", "ends_with"]).optional(),
  searchValue: z.string().optional(),
  limit: z.number().min(1).max(100).default(10),
  offset: z.number().min(0).default(0),
  sortBy: z.string().optional(),
  sortDirection: z.enum(["asc", "desc"]).optional(),
});

export const adminRouter = createTRPCRouter({
  listUsers: adminProcedure.input(listUsersSchema).query(async ({ input }) => {
    return authClient.admin.listUsers({
      query: {
        searchValue: input?.searchValue,
        searchField: input?.searchField as "name" | "email" | undefined,
        searchOperator: input?.searchOperator,
        limit: input?.limit,
        offset: input?.offset,
        sortBy: input?.sortBy,
        sortDirection: input?.sortDirection,
      },
    });
  }),

  createUser: adminProcedure
    .input(userCreateSchema)
    .mutation(async ({ input }) => {
      return authClient.admin.createUser(input);
    }),

  updateUserRole: adminProcedure
    .input(userUpdateSchema)
    .mutation(async ({ input }) => {
      return authClient.admin.setRole({
        userId: input.userId,
        role: input.role,
      });
    }),

  banUser: adminProcedure.input(userBanSchema).mutation(async ({ input }) => {
    return authClient.admin.banUser({
      userId: input.userId,
      banReason: input.banReason,
      banExpiresIn: input.banExpiresIn,
    });
  }),

  unbanUser: adminProcedure
    .input(z.object({ userId: z.string() }))
    .mutation(async ({ input }) => {
      return authClient.admin.unbanUser({
        userId: input.userId,
      });
    }),
});
