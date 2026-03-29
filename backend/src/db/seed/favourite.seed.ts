import { db } from "../index.js"
import { favourite } from "../schema.js"

const favourites = [
    {
        userId: 1,
        propertyId: 1
    },
    {
        userId: 1,
        propertyId: 2
    },
    {
        userId: 1,
        propertyId: 3
    },
    {
        userId: 1,
        propertyId: 4
    },
    {
        userId: 1,
        propertyId: 5
    },
    {
        userId: 1,
        propertyId: 6
    },
    {
        userId: 1,
        propertyId: 7
    },
    {
        userId: 1,
        propertyId: 8
    },
    {
        userId: 1,
        propertyId: 9
    },
    {
        userId: 1,
        propertyId: 10
    },
    {
        userId: 1,
        propertyId: 11
    },
    {
        userId: 1,
        propertyId: 12
    },
    {
        userId: 1,
        propertyId: 13
    },
    {
        userId: 1,
        propertyId: 14
    },
    {
        userId: 1,
        propertyId: 15
    },
    {
        userId: 1,
        propertyId: 16
    },
    {
        userId: 1,
        propertyId: 17
    },
    {
        userId: 1,
        propertyId: 18
    },
    {
        userId: 1,
        propertyId: 19
    },
    {
        userId: 1,
        propertyId: 20
    },
        
]

export async function seedFavourite() {
    console.log("Seeding properties...")

    for (const fav of favourites) {
        await db
            .insert(favourite)
            .values({
                userId: fav.userId,
                propertyId: fav.propertyId
            })
            .onConflictDoNothing()
    }
    console.log(`Seeded ${favourites.length} properties`)
}