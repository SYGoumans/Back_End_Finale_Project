import { PrismaClient } from "@prisma/client";
import fs from "fs";

const prisma = new PrismaClient();

async function main() {
  // JSON Data inlezen
  const users = JSON.parse(fs.readFileSync("./src/data/users.json")).users;
  const hosts = JSON.parse(fs.readFileSync("./src/data/hosts.json")).hosts;
  const properties = JSON.parse(
    fs.readFileSync("./src/data/properties.json")
  ).properties;
  const bookings = JSON.parse(
    fs.readFileSync("./src/data/bookings.json")
  ).bookings;
  const reviews = JSON.parse(
    fs.readFileSync("./src/data/reviews.json")
  ).reviews;

  // Users nieuw
  for (const user of users) {
    await prisma.user.upsert({
      where: { username: user.username },
      update: {},
      create: user,
    });
  }

  // Hosts nieuw
  for (const host of hosts) {
    await prisma.host.upsert({
      where: { username: host.username },
      update: {},
      create: host,
    });
  }

  // Properties nieuw
  for (const property of properties) {
    const { id, hostId, ...rest } = property;
    await prisma.property.create({
      data: {
        ...rest,
        host: { connect: { id: hostId } },
      },
    });
  }

  // Bookings nieuw
  for (const booking of bookings) {
    const { id, userId, propertyId, ...rest } = booking;

    // Controle of user & property bestaan
    const user = await prisma.user.findUnique({ where: { id: userId } });
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (user && property) {
      await prisma.booking.create({
        data: {
          ...rest,
          user: { connect: { id: userId } },
          property: { connect: { id: propertyId } },
        },
      });
    } else {
      console.warn(
        `Booking skipped: userId ${userId} or propertyId ${propertyId} not found`
      );
    }
  }

  // Reviews nieuw
  for (const review of reviews) {
    const { id, userId, propertyId, ...rest } = review;

    const user = await prisma.user.findUnique({ where: { id: userId } });
    const property = await prisma.property.findUnique({
      where: { id: propertyId },
    });

    if (user && property) {
      await prisma.review.create({
        data: {
          ...rest,
          user: { connect: { id: userId } },
          property: { connect: { id: propertyId } },
        },
      });
    } else {
      console.warn(
        `Review skipped: userId ${userId} or propertyId ${propertyId} not found`
      );
    }
  }
  console.log("Database succesvol gevuld met seed data!");
}

// Fouten afvangen + prisma
main()
  .catch((e) => {
    console.error("Seeding mislukt:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
