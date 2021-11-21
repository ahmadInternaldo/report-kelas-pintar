import * as bcrypt from 'bcrypt';

export const saltHashGenerator = async (
  password: string,
): Promise<{ hash: string }> => {
  const hash = await bcrypt.hash(password, +process.env.HASH_KEY);
  return { hash };
};