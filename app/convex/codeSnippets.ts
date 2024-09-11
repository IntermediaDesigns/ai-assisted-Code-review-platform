import { mutation, query } from './_generated/server';
import { v } from "convex/values";

export const create = mutation({
  args: { code: v.string() },
  handler: async (ctx, args) => {
    const { code } = args;
    return await ctx.db.insert('codeSnippets', { code });
  },
});

export const get = query({
  args: { id: v.id('codeSnippets') },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});