import { relations } from "drizzle-orm";
import {
    index,
    integer,
    numeric,
    pgEnum,
    pgTable,
    text,
    timestamp,
    uniqueIndex,
    varchar
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", ["buyer", "agent", "admin"])

export const user = pgTable("users", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    name: varchar({ length: 255 }).notNull(),
    email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
    role: roleEnum("role").default("buyer"),
    createdAt: timestamp("created_at").defaultNow()
},(table)=>[
    index("email_idx").on(table.email)
]);


export const property = pgTable("properties", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    title: varchar({ length: 255 }).notNull(),
    description: text().notNull(),
    price: numeric().notNull(),
    location: varchar({ length: 255 }).notNull(),
    createdAt: timestamp("created_at").defaultNow()
})


export const favourite = pgTable("favourite", {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    userId: integer("user_id").references(() => user.id, { onDelete: "cascade" }).notNull(),
    propertyId: integer("property_id").references(() => property.id, { onDelete: "cascade" }).notNull()
}, (table) => [
    index("user_properties_idx").on(table.userId, table.propertyId),
    uniqueIndex("unique_user_properties_idx").on(table.userId, table.propertyId)
])


export const userRelation = relations(user, ({ many }) => ({
    favourite: many(favourite)
}))

export const propertieRelation = relations(property, ({ many }) => ({
    favourite: many(favourite)
}))

export const favouriteRelation = relations(favourite, ({ one }) => ({
    user: one(user, {
        fields: [favourite.userId],
        references: [user.id]
    }),
    property: one(property, {
        fields: [favourite.propertyId],
        references: [property.id]
    })
}))