import { createResolver } from 'apollo-resolvers';

export const baseResolver = createResolver(
  null,
  (root, args, context, error) => error
);

export const isAuthenticatedResolver = baseResolver.createResolver(
  // Extract the user from context (undefined if non-existent)
  (root, args, { usuario }) => {
    if (!usuario) throw new Error("No autenticado");
  }
);
