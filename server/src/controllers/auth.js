// Memanggil models
const { tbUser } = require("../../models");
// Joi
const joi = require("joi");
// Bcrypt
const bcrypt = require("bcrypt");
// Token
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    const data = req.body;

    // Validasi input
    const schema = joi.object({
      fullName: joi.string().min(4).required(),
      email: joi.string().email().required(),
      username: joi.string().min(4).required(),
      password: joi.string().min(6).required(),
    });

    // Deklarasi validasi
    const { error } = schema.validate(data);

    // Jika data tidak valid
    if (error) {
      return res.status(400).send({
        status: "validation failed",
        message: error.details[0].message,
      });
    }

    // Menanggulangi duplikasi
    const checkEmail = await tbUser.findOne({
      where: {
        email: data.email,
      },
    });

    // Jika email telah didaftarkan
    if (checkEmail) {
      return res.status(400).send({
        status: "failed",
        message: "email already exists",
      });
    }

    // Sembunyikan password
    const hashStrenght = 10;
    const hashhedPassword = await bcrypt.hash(data.password, hashStrenght);

    // Jika tidak ada error
    const dataUser = await tbUser.create({
      ...data,
      password: hashhedPassword,
      image: "noname.png",
    });

    // Generate token
    const tokenData = {
      id: dataUser.id,
      fullName: dataUser.fullName,
      email: dataUser.email,
      password: dataUser.password,
    };
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(tokenData, secretKey);

    // Jika semuanya berhasil
    res.status(200).send({
      status: "success",
      data: {
        user: {
          fullName: dataUser.fullName,
          username: dataUser.username,
          email: dataUser.email,
          token,
        },
      },
    });
  } catch (err) {
    //  Jika error
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const data = req.body;
    const path = process.env.UPLOAD_PATH;

    // Validasi input
    const schema = joi.object({
      email: joi.string().email().required(),
      password: joi.string().min(6).required(),
    });

    // Deklarasi validasi
    const { error } = schema.validate(data);

    // Jika data tidak valid
    if (error) {
      return res.status(400).send({
        status: "validation failed",
        error: error.details[0].message,
      });
    }

    // Cek Email
    const dataOnTable = await tbUser.findOne({
      where: {
        email: data.email,
      },
    });

    // Jika belum didaftarkan
    if (!dataOnTable) {
      return res.status(400).send({
        status: "failed",
        message: "email and Password don't match",
      });
    }

    // Cek Password
    const validatePassword = await bcrypt.compare(
      data.password,
      dataOnTable.password
    );

    // Password Salah
    if (!validatePassword) {
      return res.status(400).send({
        status: "failed",
        message: "email and Password don't match",
      });
    }

    // Generate token
    const tokenData = {
      id: dataOnTable.id,
      fullName: dataOnTable.fullName,
      email: dataOnTable.email,
      password: dataOnTable.password,
    };

    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign(tokenData, secretKey);

    // Jika semuanya berhasil
    res.status(200).send({
      status: "success",
      data: {
        user: {
          id: dataOnTable.id,
          fullName: dataOnTable.fullName,
          username: dataOnTable.username,
          email: dataOnTable.email,
          bio: dataOnTable.bio,
          image: path + dataOnTable.image,
          token,
        },
      },
    });
  } catch (err) {
    //  Jika error
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "server error",
    });
  }
};

// auth
exports.checkAuth = async (req, res) => {
  try {
    const path = process.env.UPLOAD_PATH;

    const id = req.user.id;

    const dataUser = await tbUser.findOne({
      where: {
        id: id,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    if (!dataUser) {
      return res.status(404).send({
        status: "failed",
      });
    }

    res.send({
      status: "success",
      data: {
        user: {
          username: dataUser.username,
          email: dataUser.email,
          fullName: dataUser.fullName,
          bio: dataUser.bio,
          id: dataUser.id,
          image: path + dataUser.image,
        },
      },
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};
