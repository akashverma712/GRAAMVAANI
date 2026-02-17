import bcrypt from 'bcrypt';

export const hashPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

export const comparePassword = async (plain, hashed) => {
  return await bcrypt.compare(plain, hashed);
};
