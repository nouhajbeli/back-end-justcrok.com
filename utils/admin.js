const bcrypt = require('bcryptjs');
const databases = require('../config/database');

const email = process.env.email;
console.log('email', email);
const password = process.env.password;
console.log('password', password);

const createAdmin = async () => {
  try {
    const existedAdmin = await databases.community.models.User.findOne({
      where: { email },
    });
    if (!existedAdmin) {
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = await databases.community.models.User.create({
        email,
        password: hashedPassword,
        role: 'admin',
      });

      console.log('admin created');
    }
    console.log('admin already exist');
  } catch (error) {
    console.log(error);
  }
};

module.exports = createAdmin;
