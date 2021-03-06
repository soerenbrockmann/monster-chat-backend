import cookie from 'cookie';
import { verifyJWT } from './authenticate';
import { getUserById } from './users';
import Chat from '../models/chat';

export const initIO = (io) => {
  io.on('connection', async (socket) => {
    try {
      const chatHistory = await getMessages();

      const mappedChatHistory = chatHistory.map(async ({ userId, text }) => {
        const [userRecord] = await getUserById(userId);
        return { userId, userName: userRecord.name, text };
      });

      const resolvedChatHistory = await Promise.all(mappedChatHistory);

      io.emit('chat history', resolvedChatHistory);
    } catch (error) {
      console.log(error);
    }

    socket.on('chat message', async (msg) => {
      const user = await getUserDetails(socket);
      const chatDetails = {
        msg,
        userId: user._id,
        userName: user.name,
      };
      saveMessage({ userId: user._id, text: msg });
      io.emit('chat message', chatDetails);
    });
  });
};

const getUserDetails = async (socket) => {
  const cookies = cookie.parse(socket.request.headers.cookie || '');
  const user = await verifyJWT(cookies['jwt']);
  const [userRecord] = await getUserById(user._id);
  return userRecord;
};

const saveMessage = async (message) => {
  try {
    await Chat.create(message);
  } catch (error) {
    console.log(error);
  }
};

const getMessages = async () => {
  try {
    return Chat.find({});
  } catch (error) {
    throw new Error(error);
  }
};
