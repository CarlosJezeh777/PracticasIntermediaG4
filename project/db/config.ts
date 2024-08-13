import { defineDb, defineTable, column } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    name: column.text(),
    passwd: column.text(),
    email: column.text({ optional: true }),
  },
});

const Images = defineTable({
  columns: {
    id: column.number({ primaryKey: true }),
    userId: column.number({ references: () => Users.columns.id }),
    url: column.text(),
  },
});

export default defineDb({
  tables: { Users, Images },
});
