// memanggil model tabel database
const { tbUser, tbFeed, tbFollow, tbLike, tbComment } = require("../../models");
const fs = require("fs");

// joi
const joi = require("joi");

exports.addFeed = async (req, res) => {
  try {
    const data = req.body;

    const dataUpload = {
      ...data,
      fileName: req.file.filename,
      idUser: req.user.id,
    };

    await tbFeed.create(dataUpload);

    // Jika berhasil
    res.status(200).send({
      status: "success",
      message: "upload feed success",
      data: {
        dataUpload,
      },
    });
  } catch (err) {
    // Jika Error
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server error",
    });
  }
};

exports.deleteFeed = async (req, res) => {
  try {
    const feedId = req.params.id;

    const findFeed = await tbFeed.findOne({
      where: {
        id: feedId,
      },
    });

    if (!findFeed) {
      res.status(403).send({
        status: "failed",
      });
    }

    fs.unlink(`uploads/${findFeed.fileName}`, (err) => {
      console.log(err);
    });

    await tbFeed.destroy({
      where: {
        id: feedId,
      },
    });

    res.status(200).send({
      status: "success",
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
    });
  }
};

exports.followingFeeds = async (req, res) => {
  try {
    // menemukan id
    const { id } = req.params;

    // menampilkan data
    const userData = await tbUser.findOne({
      // mengecualikan jika tidak ingin di tampilkan
      where: {
        id: id,
      },
      attributes: {
        exclude: [
          "password",
          "createdAt",
          "updatedAt",
          "bio",
          "image",
          "name",
          "username",
          "email",
          "fullName",
        ],
      },
      include: {
        model: tbFollow,
        as: "followings",
        include: {
          model: tbUser,
          as: "followings",
          include: {
            model: tbFeed,
            as: "feed",
            include: [
              {
                model: tbUser,
                as: "user",
                attributes: {
                  exclude: ["updatedAt", "bio", "password", "email"],
                },
              },
              {
                model: tbLike,
                as: "likers",
              },
            ],
            order: [["id", "DESC"]],
            attributes: {
              exclude: ["updatedAt", "followers", "followings", "idUser"],
            },
          },
          attributes: {
            exclude: [
              "password",
              "createdAt",
              "updatedAt",
              "bio",
              "image",
              "name",
              "username",
              "email",
              "fullName",
            ],
          },
        },
        attributes: {
          exclude: ["updatedAt", "createdAt", "idFollowers", "idFollowings"],
        },
      },
    });

    let status = [];
    for (let index = 0; index < userData.followings.length; index++) {
      const element = userData.followings[index];
      for (let index2 = 0; index2 < element.followings.feed.length; index2++) {
        const element2 = element.followings.feed[index2];
        status.push(element2);
      }
    }
    // tampikan ketika berhasil
    res.status(200).send({
      status: "success",
      data: status,
    });

    // tampilkan ketika server eror
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.feeds = async (req, res) => {
  try {
    // Menampilkan semua data
    let allfeed = await tbFeed.findAll({
      include: [
        {
          model: tbUser,
          as: "user",
          attributes: {
            exclude: ["updatedAt", "bio", "password", "email"],
          },
        },
        {
          model: tbLike,
          as: "likers",
        },
      ],
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    const parseJSON = JSON.parse(JSON.stringify(allfeed));

    allfeed = parseJSON.map((item) => {
      return {
        ...item,
        fileName: item.fileName,
      };
    });

    // Jika berhasil
    res.status(200).send({
      status: "success",
      message: "feeds",
      data: {
        feeds: allfeed,
      },
    });

    // Jika error
  } catch (err) {
    console.log(err);
    res.status(400).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.likeFeed = async (req, res) => {
  try {
    const idUser = req.user.id;
    const id = req.body.id;

    // cek inputan
    const schema = joi
      .object({
        id: joi.number().required(),
      })
      .validate(req.body);

    // jika tidak memebuhi
    if (schema.error) {
      return res.status(400).send({
        status: "failed",
        message: schema.error.details[0].message,
      });
    }

    // mengecek apakah id ada di feed
    const checkId = await tbFeed.findOne({
      where: {
        id: id,
      },
    });

    // mencari emaail ada atau tidak
    if (!checkId) {
      return res.status(400).send({
        status: "failed",
        message: "id feed not found",
      });
    }

    // cek jika udah like atau belum
    const check = await tbLike.findOne({
      where: {
        idUser: idUser,
        idFeed: id,
      },
    });

    if (check) {
      await tbLike.destroy({ where: { idFeed: id, idUser: idUser } });
      // cek if feed
      const datas = await tbFeed.findOne({
        where: {
          id: id,
        },
      });

      res.status(200).send({
        status: "success",
        id,
      });
    } else {
      // cek if feed
      const data = await tbFeed.findOne({
        where: {
          id: id,
        },
      });

      // tambahkan data ke like
      await tbLike.create({
        idFeed: id,
        idUser: idUser,
      });

      // menambhkan 1 dan update like feed
      const likes = (data.like += 1);
      await tbFeed.update(
        { like: likes },
        {
          where: {
            id: id,
          },
        }
      );

      res.status(200).send({
        status: "success",
        id: id,
      });
    }

    // Jika error
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.getLike = async (req, res) => {
  try {
    const { id } = req.params;

    const likes = await tbLike.findAll({
      where: {
        idFeed: id,
      },
    });

    if (!likes) {
      return res.send({
        status: "failed",
        message: "No Likes",
      });
    }

    res.send({
      status: "success",
      data: likes,
    });
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.commentsFeed = async (req, res) => {
  try {
    const id = req.params.id;

    const comments = await tbComment.findAll({
      attributes: {
        exclude: ["updatedAt", "idFeed", "idUser"],
      },
      include: {
        model: tbUser,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
      where: {
        idFeed: id,
      },
      order: [["createdAt", "ASC"]],
    });

    // tampikan ketika berhasil
    res.status(200).send({
      status: "success",
      data: {
        comments: comments,
      },
    });

    // tampilkan ketika server eror
  } catch (err) {
    console.log(err);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.addComment = async (req, res) => {
  try {
    const comment = req.body;

    const dataComment = {
      ...comment,
      idUser: req.user.id,
    };

    await tbComment.create(dataComment);

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

exports.getFeed = async (req, res) => {
  try {
    // menampilkan id dari token

    const { id } = req.params;

    // menampilkan semua data
    const feeds = await tbFeed.findAll({
      where: {
        idUser: id,
      },
      include: [
        {
          model: tbUser,
          as: "user",
          attributes: {
            exclude: ["updatedAt", "bio", "password", "email"],
          },
        },
        {
          model: tbLike,
          as: "likers",
        },
      ],
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // tampikan ketika berhasil
    res.send({
      status: "success",
      data: {
        feeds,
      },
    });

    // ketika server erorr
  } catch (error) {
    console.log(error);
    res.status({
      status: "failed",
      message: "Server Error",
    });
  }
};

exports.detailFeed = async (req, res) => {
  try {
    const { id } = req.params;

    // menampilkan data
    const feeds = await tbFeed.findOne({
      where: {
        id: id,
      },
      include: {
        model: tbUser,
        as: "user",
        attributes: {
          exclude: ["createdAt", "updatedAt", "bio", "password", "email"],
        },
      },
      order: [["id", "DESC"]],
      attributes: {
        exclude: ["createdAt", "updatedAt", "password"],
      },
    });

    // tampikan ketika berhasil
    res.status(200).send({
      status: "success",
      data: {
        feeds,
      },
    });

    // ketika server erorr
  } catch (error) {
    console.log(error);
    res.status(500).send({
      status: "failed",
      message: "Server Error",
    });
  }
};
