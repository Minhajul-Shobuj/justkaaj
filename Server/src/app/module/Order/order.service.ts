/* eslint-disable @typescript-eslint/no-explicit-any */
import { Order, Order_Status } from '@prisma/client';
import { prisma } from '../../utils/prisma';
import { Request } from 'express';

const createOrder = async (data: Order) => {
  const order = await prisma.order.create({
    data,
    include: {
      service: true,
      user: true,
      provider: true,
    },
  });
  return order;
};

const updateOrderStatus = async (id: string, status: Order_Status) => {
  const updated = await prisma.order.update({
    where: { id },
    data: { status },
  });
  return updated;
};

const getUserOrders = async (req: Request) => {
  const userId = (req as any).user.id;
  const orders = await prisma.order.findMany({
    where: { userId },
    include: {
      service: true,
      provider: {
        include: {
          user: true,
        },
      },
    },
    orderBy: { createdAt: 'desc' },
  });
  return orders;
};

const getProviderOrders = async (req: Request) => {
  const providerEmail = (req as any).user.email;
  const provider = await prisma.service_Provider.findFirstOrThrow({
    where: { email: providerEmail },
  });

  const orders = await prisma.order.findMany({
    where: { providerId: provider.id },
    include: {
      service: true,
      user: true,
    },
    orderBy: { createdAt: 'desc' },
  });
  return orders;
};

export const OrderService = {
  createOrder,
  updateOrderStatus,
  getUserOrders,
  getProviderOrders,
};
