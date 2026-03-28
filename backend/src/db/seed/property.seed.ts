import { db } from "../index.js"
import { property } from "../schema.js"

const properties = [
    {
        "title": "Modern 2BHK Apartment with Balcony",
        "price": 85000,
        "area": "Baneshwor",
        "city": "Kathmandu",
        "province": "Bagmati",
        "description": "Comfortable 2-bedroom apartment in Baneshwor with easy access to shops, schools, and public transport. Includes balcony, parking, and 24/7 water supply."
    },
    {
        "title": "Spacious 3BHK House with Garden",
        "price": 210000,
        "area": "Lazimpat",
        "city": "Kathmandu",
        "province": "Bagmati",
        "description": "3-bedroom house with a private garden and rooftop in Lazimpat. Close to embassies and international schools. Borewell and solar water heater included."
    },
    {
        "title": "Studio Apartment Near Thamel",
        "price": 32000,
        "area": "Thamel",
        "city": "Kathmandu",
        "province": "Bagmati",
        "description": "Cozy studio apartment ideal for singles or couples. Walking distance to Thamel market, restaurants, and tourist attractions. Fully furnished option available."
    },
    {
        "title": "Commercial Shop Space in New Road",
        "price": 150000,
        "area": "New Road",
        "city": "Kathmandu",
        "province": "Bagmati",
        "description": "Prime commercial shop space on the ground floor of a busy market in New Road. High foot traffic, suitable for retail, pharmacy, or food outlet."
    },
    {
        "title": "1BHK Flat in Patan Durbar Area",
        "price": 55000,
        "area": "Patan",
        "city": "Lalitpur",
        "province": "Bagmati",
        "description": "Charming 1-bedroom flat near Patan Durbar Square with heritage views. Quiet neighborhood, ideal for couples or working professionals."
    },
    {
        "title": "4BHK Bungalow with Parking",
        "price": 450000,
        "area": "Jhamsikhel",
        "city": "Lalitpur",
        "province": "Bagmati",
        "description": "Luxurious 4-bedroom bungalow in Jhamsikhel with a spacious parking area, rooftop terrace, and modern kitchen. Close to major hospitals and schools."
    },
    {
        "title": "2BHK Apartment in Imadol",
        "price": 72000,
        "area": "Imadol",
        "city": "Lalitpur",
        "province": "Bagmati",
        "description": "Well-maintained 2-bedroom apartment in Imadol with 24-hour security, parking, and a children's play area. Easy access to Ring Road."
    },
    {
        "title": "Office Space in Pulchowk",
        "price": 95000,
        "area": "Pulchowk",
        "city": "Lalitpur",
        "province": "Bagmati",
        "description": "Modern office space in Pulchowk suitable for startups and NGOs. Comes with high-speed internet, conference room, and backup power."
    },
    {
        "title": "3BHK House near Bhaktapur Durbar",
        "price": 185000,
        "area": "Suryabinayak",
        "city": "Bhaktapur",
        "province": "Bagmati",
        "description": "Spacious 3-bedroom house in Suryabinayak with mountain views. Traditional brick architecture with modern interiors. Ample parking and garden space."
    },
    {
        "title": "Land Plot for Sale in Sallaghari",
        "price": 320000,
        "area": "Sallaghari",
        "city": "Bhaktapur",
        "province": "Bagmati",
        "description": "Residential land plot of 3 anna in Sallaghari, Bhaktapur. All utilities connected, accessible road, and near local market."
    },
    {
        "title": "1BHK Apartment in Pokhara Lakeside",
        "price": 48000,
        "area": "Lakeside",
        "city": "Pokhara",
        "province": "Gandaki",
        "description": "Charming 1-bedroom apartment with Phewa Lake views in Pokhara Lakeside. Ideal for vacation rental or long-term stay. Walking distance to restaurants."
    },
    {
        "title": "2BHK Flat in Mahendrapul",
        "price": 68000,
        "area": "Mahendrapul",
        "city": "Pokhara",
        "province": "Gandaki",
        "description": "Comfortable 2-bedroom flat in central Pokhara. Close to banks, hospitals, and Prithvi Narayan Campus. Includes covered parking and generator backup."
    },
    {
        "title": "Commercial Property in Newroad Pokhara",
        "price": 220000,
        "area": "New Road",
        "city": "Pokhara",
        "province": "Gandaki",
        "description": "Multi-story commercial building in Pokhara's busy New Road. Suitable for hotel, hospital, or shopping complex. Strategically located near city bus park."
    },
    {
        "title": "3BHK Villa with Annapurna View",
        "price": 380000,
        "area": "Seti Dobhan",
        "city": "Pokhara",
        "province": "Gandaki",
        "description": "Stunning 3-bedroom villa with panoramic Annapurna mountain views. Large garden, terrace, and fully fitted kitchen. Perfect for premium rental or personal use."
    },
    {
        "title": "Land for Sale in Lekhnath",
        "price": 95000,
        "area": "Lekhnath",
        "city": "Pokhara",
        "province": "Gandaki",
        "description": "5 ana residential land in Lekhnath municipality. Road access, nearby schools and market. Suitable for building a family home."
    },
    {
        "title": "2BHK Apartment in Birgunj",
        "price": 42000,
        "area": "Adarshanagar",
        "city": "Birgunj",
        "province": "Madhesh",
        "description": "Well-ventilated 2-bedroom apartment in Adarshanagar, Birgunj. Close to the Indian border, ideal for business professionals and traders."
    },
    {
        "title": "Commercial Shop in Birgunj Bazar",
        "price": 180000,
        "area": "Birgunj Bazar",
        "city": "Birgunj",
        "province": "Madhesh",
        "description": "Ground floor shop in Birgunj's main market area. High visibility and footfall. Suitable for grocery, electronics, or textile business."
    },
    {
        "title": "3BHK House in Janakpur",
        "price": 130000,
        "area": "Ram Mandir Road",
        "city": "Janakpur",
        "province": "Madhesh",
        "description": "Spacious 3-bedroom house near Janaki Mandir in Janakpur. Traditional courtyard design with modern amenities. Close to temples and local markets."
    },
    {
        "title": "1BHK Flat in Lahan",
        "price": 28000,
        "area": "Lahan Bazar",
        "city": "Lahan",
        "province": "Madhesh",
        "description": "Affordable 1-bedroom flat in Lahan, Siraha. Close to local market, schools, and hospital. Ideal for single professionals or small families."
    },
    {
        "title": "Land Plot in Malangwa",
        "price": 75000,
        "area": "Malangwa",
        "city": "Malangwa",
        "province": "Madhesh",
        "description": "Residential plot in Malangwa, Sarlahi. Paved road access, all utilities nearby. Suitable for constructing a house or small business."
    },
    {
        "title": "2BHK Flat in Butwal",
        "price": 62000,
        "area": "Traffic Chowk",
        "city": "Butwal",
        "province": "Lumbini",
        "description": "Modern 2-bedroom flat near Traffic Chowk in Butwal. Close to hospitals, schools, and the main bazaar. Includes generator backup and parking."
    },
    {
        "title": "House with Land in Bhairahawa",
        "price": 195000,
        "area": "Siddharth Nagar",
        "city": "Bhairahawa",
        "province": "Lumbini",
        "description": "3-bedroom house with 4 anna land in Siddharth Nagar, Bhairahawa. Close to Gautam Buddha International Airport. Ideal for families or investment."
    },
    {
        "title": "Commercial Space in Tansen",
        "price": 110000,
        "area": "Tansen Bazar",
        "city": "Tansen",
        "province": "Lumbini",
        "description": "Historic-area commercial space in Tansen Bazar. Suitable for handicraft shops, guesthouses, or restaurants. Old-town charm with modern utilities."
    },
    {
        "title": "3BHK Apartment in Nepalgunj",
        "price": 88000,
        "area": "Surkhet Road",
        "city": "Nepalgunj",
        "province": "Lumbini",
        "description": "Spacious 3-bedroom apartment near Surkhet Road in Nepalgunj. Close to Mid-Western University and Bheri Hospital. Includes parking and security guard."
    },
    {
        "title": "Land for Sale in Dang",
        "price": 58000,
        "area": "Tulsipur",
        "city": "Tulsipur",
        "province": "Lumbini",
        "description": "Residential land in Tulsipur, Dang. Road access and utilities available. Suitable for home construction or agricultural use."
    },
    {
        "title": "2BHK House in Dhangadhi",
        "price": 78000,
        "area": "Golpark",
        "city": "Dhangadhi",
        "province": "Sudurpashchim",
        "description": "2-bedroom house in Golpark, Dhangadhi. Close to Dhangadhi market and airport. Spacious yard, borewell, and solar panel included."
    },
    {
        "title": "Apartment in Mahendranagar",
        "price": 45000,
        "area": "Bhimdatta Municipality",
        "city": "Mahendranagar",
        "province": "Sudurpashchim",
        "description": "1-bedroom apartment in Bhimdatta Municipality, Kanchanpur. Good connectivity to India border and local markets. Suitable for working professionals."
    },
    {
        "title": "Commercial Plot in Tikapur",
        "price": 92000,
        "area": "Tikapur Bazar",
        "city": "Tikapur",
        "province": "Sudurpashchim",
        "description": "Commercial land in central Tikapur. High footfall area near bus station and market. Suitable for hotel or retail development."
    },
    {
        "title": "3BHK House in Attariya",
        "price": 115000,
        "area": "Attariya",
        "city": "Kailali",
        "province": "Sudurpashchim",
        "description": "Spacious 3-bedroom house in Attariya, Kailali. Close to schools and hospital. Comes with large garden, parking, and city water supply."
    },
    {
        "title": "Land Plot in Dadeldhura",
        "price": 40000,
        "area": "Dadeldhura Bazar",
        "city": "Dadeldhura",
        "province": "Sudurpashchim",
        "description": "Hilly residential plot in Dadeldhura. Accessible road, scenic mountain surroundings. Ideal for home or eco-resort construction."
    },
    {
        "title": "2BHK Flat in Surkhet",
        "price": 55000,
        "area": "Birendranagar",
        "city": "Surkhet",
        "province": "Karnali",
        "description": "2-bedroom flat in Birendranagar, Surkhet. Modern construction with backup power, parking, and rooftop access. Close to Karnali Provincial Hospital."
    },
    {
        "title": "House for Sale in Jumla",
        "price": 68000,
        "area": "Jumla Bazar",
        "city": "Jumla",
        "province": "Karnali",
        "description": "3-bedroom traditional house in Jumla Bazar. Ideal for government workers or locals. Large courtyard, apple garden, and mountain scenery."
    },
    {
        "title": "Land in Dailekh",
        "price": 32000,
        "area": "Narayan Municipality",
        "city": "Dailekh",
        "province": "Karnali",
        "description": "Flat agricultural-residential land in Dailekh's Narayan Municipality. River access and road connection. Suitable for farming or home construction."
    },
    {
        "title": "Commercial Property in Birendranagar",
        "price": 145000,
        "area": "Main Bazar",
        "city": "Surkhet",
        "province": "Karnali",
        "description": "Two-story commercial building in Main Bazar, Birendranagar. Ground floor shops currently rented. Good rental income potential."
    },
    {
        "title": "1BHK Flat in Rukum",
        "price": 22000,
        "area": "Musikot",
        "city": "Rukum",
        "province": "Karnali",
        "description": "Affordable 1-bedroom flat in Musikot, Rukum. Good for government workers and students. Basic amenities, road accessible."
    },
    {
        "title": "2BHK Flat in Bharatpur",
        "price": 75000,
        "area": "Narayangadh",
        "city": "Bharatpur",
        "province": "Bagmati",
        "description": "2-bedroom flat in Narayangadh, Chitwan. Close to Chitwan National Park entrance and city center. Includes balcony, parking, and 24/7 water."
    },
    {
        "title": "House near Chitwan National Park",
        "price": 265000,
        "area": "Sauraha",
        "city": "Bharatpur",
        "province": "Bagmati",
        "description": "4-bedroom guesthouse near Sauraha, Chitwan. Currently operating as tourist accommodation. Steady rental income from wildlife tourists."
    },
    {
        "title": "3BHK Apartment in Hetauda",
        "price": 90000,
        "area": "Hetauda Bazar",
        "city": "Hetauda",
        "province": "Bagmati",
        "description": "3-bedroom apartment in Hetauda, Makwanpur. Close to industrial zone and highway. Suitable for business families or professionals."
    },
    {
        "title": "Commercial Space in Damauli",
        "price": 125000,
        "area": "Damauli Bazar",
        "city": "Damauli",
        "province": "Gandaki",
        "description": "Roadside commercial property in Damauli, Tanahu. On the Pokhara-Kathmandu highway. Suitable for fuel station, restaurant, or lodge."
    },
    {
        "title": "2BHK House in Gorkha",
        "price": 62000,
        "area": "Gorkha Bazar",
        "city": "Gorkha",
        "province": "Gandaki",
        "description": "Traditional 2-bedroom house in Gorkha Bazar. Near Gorkha Durbar and local market. Mountain views and a small kitchen garden."
    },
    {
        "title": "1BHK Flat in Baglung",
        "price": 30000,
        "area": "Baglung Bazar",
        "city": "Baglung",
        "province": "Gandaki",
        "description": "Compact 1-bedroom flat in central Baglung. Close to schools, hospital, and bus park. Good for students and single workers."
    },
    {
        "title": "3BHK House in Waling",
        "price": 98000,
        "area": "Waling Bazar",
        "city": "Waling",
        "province": "Gandaki",
        "description": "3-bedroom house in Waling, Syangja. Modern build with solar panels, city water supply, and rooftop. Easy highway access."
    },
    {
        "title": "Land in Lamjung",
        "price": 45000,
        "area": "Besisahar",
        "city": "Besisahar",
        "province": "Gandaki",
        "description": "Residential land in Besisahar, Lamjung. Near Marsyangdi River, gateway to Annapurna Circuit. Ideal for lodge or family home."
    },
    {
        "title": "2BHK Flat in Dharan",
        "price": 70000,
        "area": "Dharan Bazar",
        "city": "Dharan",
        "province": "Koshi",
        "description": "2-bedroom flat in central Dharan, Sunsari. Close to BP Koirala Institute and army base. Spacious rooms with balcony and parking."
    },
    {
        "title": "House in Biratnagar",
        "price": 175000,
        "area": "Traffic Chowk",
        "city": "Biratnagar",
        "province": "Koshi",
        "description": "4-bedroom house in Biratnagar's main area. Good for large families or as a rental property. City water, borewell, and generator backup."
    },
    {
        "title": "Commercial Plot in Itahari",
        "price": 210000,
        "area": "Itahari Chowk",
        "city": "Itahari",
        "province": "Koshi",
        "description": "Prime commercial land at Itahari Chowk on BP Highway. High traffic, suitable for petrol pump, hotel, or shopping mall."
    },
    {
        "title": "1BHK Apartment in Damak",
        "price": 35000,
        "area": "Damak Bazar",
        "city": "Damak",
        "province": "Koshi",
        "description": "Affordable 1-bedroom apartment in Damak, Jhapa. Close to tea estates and local market. Suitable for tea industry professionals."
    },
    {
        "title": "3BHK House in Mechinagar",
        "price": 145000,
        "area": "Birtamod",
        "city": "Birtamod",
        "province": "Koshi",
        "description": "Spacious 3-bedroom house in Birtamod, Jhapa. Near Indian border and Mechi Highway. Good for trade-oriented families or rental."
    }
]

export async function seedProperty() {
    console.log("Seeding properties...")

    for (const prop of properties) {
        await db
            .insert(property)
            .values({
                title: prop.title,
                price: String(prop.price),
                area: prop.area,
                city: prop.city,
                province: prop.province,
                description: prop.description
            })
            .onConflictDoNothing()
    }
    console.log(`Seeded ${properties.length} properties`)
}