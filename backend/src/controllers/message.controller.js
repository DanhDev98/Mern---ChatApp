import User from "../models/user.model.js";
import Message from "../models/message.model.js";
import cloudinary from "../lib/cloudinary.js";
import { getReceiverSocketId, io } from "../lib/socket.io.js";

export const getUserForSideBar = async (req, res) => {
  try {
    const logginUser = req.user._id;
    const fillteredUser = await User.find({ _id: { $ne: logginUser } }).select(
      "-password"
    );
    return res.status(200).json(fillteredUser);
  } catch (error) {
    console.log("Error from getUserForSideBar", error.message);
    return res.status(500).json({ message: "Invalid Error Server" });
  }
};

export const getMessage = async (req, res) => {
  try {
    const { id: userToChatId } = req.params;
    const myId = req.user._id;

    const message = await Message.find({
      $or: [
        { senderId: userToChatId, recieverId: myId },
        { senderId: myId, recieverId: userToChatId },
      ],
    });

    return res.status(200).json(message);
  } catch (error) {
    console.log("Error from getMessage", error.message);
    return res.status(500).json({ message: "Internal Error Server" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const { id: recieverId } = req.params;
    const senderId = req.user._id;
    let imgUrl;
    if (image) {
      const uploadImgToCloud = await cloudinary.uploader.upload(image);
      imgUrl = uploadImgToCloud.secure_url;
    }

    const newMessage = new Message({
      senderId,
      recieverId,
      text,
      image: imgUrl,
    });

    await newMessage.save();
    //xu ly realtime socket io tai day
    const recieverSocketId = getReceiverSocketId(recieverId)
    if (recieverSocketId) {
      io.to(recieverSocketId).emit('newMessage', newMessage);
    }


    return res.status(200).json(newMessage);
  } catch (error) {
    console.log("Error from sendMessage", error.message);
    return res.status(500).json({ message: "Internal Error Server" });
  }
};
