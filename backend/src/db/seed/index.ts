import { seedProperty } from "./property.seed.js";

async function main() {
    await seedProperty()
    console.log("Seeding Success")
    process.exit(0);
}

main().catch(err => {
    console.log("error while seeding :: ", err)
    process.exit(1)
})