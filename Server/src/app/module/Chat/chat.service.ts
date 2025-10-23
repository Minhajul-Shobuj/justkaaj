/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request } from 'express';
import { prisma } from '../../utils/prisma';

const sendMessage = async (req: Request) => {
  const senderId = (req as any).user.id;
  const { message } = req.body;
  const { receiverId } = req.params;

  const newMessage = await prisma.chat.create({
    data: { senderId, receiverId, message },
    include: {
      sender: { select: { user_id: true, fullName: true } },
      receiver: { select: { user_id: true, fullName: true } },
    },
  });

  return newMessage;
};

const getAllMessagesFromASender = async (req: Request) => {
  const senderId = (req as any).user.id;
  const { receiverId } = req.params;

  const messages = await prisma.chat.findMany({
    where: {
      OR: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId },
      ],
    },
    orderBy: { createdAt: 'asc' },
  });

  return messages;
};

const getAllUserIChatWith = async (req: Request) => {
  const senderId = (req as any).user.id;

  const chats = await prisma.chat.findMany({
    where: {
      OR: [{ senderId }, { receiverId: senderId }],
    },
    include: {
      sender: { select: { user_id: true, fullName: true, profileImage: true } },
      receiver: {
        select: { user_id: true, fullName: true, profileImage: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  });

  const uniqueUsers = Array.from(
    new Map(
      chats.map((chat) => {
        const user = chat.senderId === senderId ? chat.receiver : chat.sender;
        return [user.user_id, user];
      })
    ).values()
  );

  return uniqueUsers;
};

export const ChatService = {
  sendMessage,
  getAllMessagesFromASender,
  getAllUserIChatWith,
};
