import {
  createRoom,
  getRooms,
  getRoomById,
  updateRoom,
  deleteRoom,
  getAvailableRooms,
  updateRoomStatus,
} from "./room.service.js";

export const createRoomController = async (req, res, next) => {
  try {
    const room = await createRoom(req.body);
    res.status(201).json({
      data: room,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllRoomsController = async (req, res, next) => {
  try {
    const rooms = await getRooms(req.query);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getRoomByIdController = async (req, res) => {
  try {
    const room = await getRoomById(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: "error.message" });
  }
};

export const updateRoomController = async (req, res) => {
  try {
    const room = await updateRoom(req.params.id, req.body);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteRoomController = async (req, res) => {
  try {
    const room = await deleteRoom(req.params.id);
    if (!room) {
      return res.status(404).json({ message: "Room not found" });
    }
    res.status(200).json({ message: "Room deleted successful" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getAvailableRoomsController = async (req, res) => {
  try {
    const rooms = await getAvailableRooms(req.query.type);
    res.status(200).json(rooms);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const updateRoomStatusController = async (req, res) => {
  try {
    const { status } = req.body;
    const room = await updateRoomStatus(req.params.id, status);
    if (!room) {
      return res.status(404).json({ message: "room not found" });
    }
    res.status(200).json(room);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
