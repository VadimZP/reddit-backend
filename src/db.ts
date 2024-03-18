// import { PrismaClient } from "@prisma/client";
// import { withBark } from "prisma-extension-bark";

// const db = new PrismaClient().$extends(withBark({ modelNames: ["comment"] }));

// export default db;

import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

export default db;

