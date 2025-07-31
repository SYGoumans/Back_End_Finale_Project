import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getAllHosts() {
  return prisma.host.findMany();
}

export async function getHostById(id) {
  return prisma.host.findUnique({ where: { id } });
}

export async function createHost(data) {
  return prisma.host.create({ data });
}

export async function updateHost(id, data) {
  return prisma.host.update({ where: { id }, data });
}

export async function deleteHost(id) {
  return prisma.host.delete({ where: { id } });
}
