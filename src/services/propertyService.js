import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllProperties = async (location) => {
  if (location) {
    return prisma.property.findMany({
      where: { location: { contains: location, mode: "insensitive" } },
    });
  }
  return prisma.property.findMany();
};

export const getPropertyById = async (id) => {
  return prisma.property.findUnique({ where: { id } });
};

export const createProperty = async (data) => {
  return prisma.property.create({ data });
};

export const updateProperty = async (id, data) => {
  return prisma.property.update({ where: { id }, data });
};

export const deleteProperty = async (id) => {
  return prisma.property.delete({ where: { id } });
};
