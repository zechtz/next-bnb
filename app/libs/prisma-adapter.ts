import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient } from "@prisma/client";
import { Adapter } from "next-auth/adapters";

const prisma = new PrismaClient();

const prismaAdapter: Adapter<any, any, any> = PrismaAdapter(prisma);

const adapter = (config: any): any => {
  const finalConfig = {
    ...config,
    adapter: prismaAdapter,
    callbacks: {
      ...config.callbacks,
      session: async (session: any, user: any) => {
        // Convert the id property from string to integer
        session.user.id = parseInt(session.user.id);
        return await config.callbacks.session(session, user);
      },
    },
  };
  return finalConfig;
};

export default adapter;
