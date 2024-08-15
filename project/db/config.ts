import { defineDb, defineTable, column } from "astro:db";

const User = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    username: column.text({ optional: false, unique: true }),
    password: column.text({ optional: false }),
    email: column.text({ optional: true, unique: true }),
  },
});

const Session = defineTable({
  columns: {
    id: column.text({ optional: false, unique: true }),
    userId: column.text({
      optional: false,
      references: () => User.columns.id,
    }),
    expiresAt: column.text({ optional: false }),
  },
});

const Pokemons = defineTable({
  columns: {
    id: column.text({ primaryKey: true, optional: false, unique: true }),
    name: column.text({ optional: false, unique: true }),
    image: column.text({ optional: false }),
  },
});

export default defineDb({
  tables: { User, Session, Pokemons },
});
