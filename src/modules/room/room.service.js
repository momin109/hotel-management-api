import Room from "./room.model.js";

export const createRoom = async (roomData) => {
  const room = new Room(roomData);
  return await room.save();
};

export const getRooms = async (filter = {}) => {
  return await Room.find(filter);
};

export const getRoomById = async (id) => {
  return await Room.findById(id);
};

export const updateRoom = async (id, updateData) => {
  return await Room.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteRoom = async (id) => {
  return await Room.findByIdAndDelete(id);
};

export const getAvailableRooms = async (type) => {
  const filter = { status: "available" };
  if (type) filter.type = type;
  return await Room.find(filter);
};

export const updateRoomStatus = async (id, status) => {
  return await Room.findByIdAndUpdate(id, { status }, { new: true });
};
