import { mutation, query } from '../../convex/_generated/server';
import { v } from "convex/values";

export const create = mutation({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    const { code } = args;
    return await ctx.db.insert('codeSnippets', { code, userId, createdAt: Date.now() });
  },
});

export const list = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      throw new Error("Not authenticated");
    }
    const userId = identity.subject;
    return await ctx.db
      .query("codeSnippets")
      .withIndex("by_user", (q) => q.eq("userId", userId))
      .order("desc")
      .take(10);
  },
});

export const get = query({
  args: { id: v.id('codeSnippets') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});