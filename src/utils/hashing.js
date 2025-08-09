import bcrypt from "bcryptjs";

const hashMatched = async (raw, hash) => {
  const result = await bcrypt.compare(raw, hash);
  return result;
};

export { hashMatched };
