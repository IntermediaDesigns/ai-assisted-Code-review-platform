import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  codeSnippets: defineTable({
    code: v.string(),
    userId: v.string(),
    createdAt: v.number(),
  }).index("by_user", ["userId"]),
});