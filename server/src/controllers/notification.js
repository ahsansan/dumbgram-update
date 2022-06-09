// Model tabel message
const { tbNotification, tbUser } = require("../../models");
const { Op } = require("sequelize");

exports.addNotif = async (req, res) => {
  try {
    const notif = req.body;

    const dataComment = {
      ...notif,
      idSender: req.user.id,
    };

    await tbNotification.create(dataComment);

    res.status(200).send({
      status: "success",
      message: "comment success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getNotif = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await tbNotification.findAll({
      where: {
        [Op.and]: [
          { idReceiver: id },
          {
            idSender: {
              [Op.not]: [id],
            },
          },
        ],
      },
      include: {
        model: tbUser,
        as: "sender",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "email", "password"],
        },
      },
      attributes: {
        exclude: ["createdAt", "updatedAt", "idReceiver", "idSender"],
      },
      order: [["createdAt", "DESC"]],
    });

    // Jika berhasil
    res.status(200).send({
      status: "success",
      data,
    });

    // Jika error server
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
