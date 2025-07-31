import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllBookings = async () => {
  return prisma.booking.findMany();
};

export const getBookingById = async (id) => {
  return prisma.booking.findUnique({ where: { id } });
};

export const createBooking = async (data) => {
  return prisma.booking.create({ data });
};

export const updateBooking = async (id, data) => {
  return prisma.booking.update({ where: { id }, data });
};

export const deleteBooking = async (id) => {
  return prisma.booking.delete({ where: { id } });
};
