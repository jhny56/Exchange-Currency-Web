const { User: UserModel, Balance, Currency } = require("../models/user.models");
const { Op: Operation } = require("sequelize");

class User {
  async register(req, res) {
    // save the data to MYSql if username and email are not taken
    try {
      let user = await UserModel.findOne({
        //get users with username or email
        where: {
          [Operation.or]: [
            { Username: req.body.Username },
            { Email: req.body.Email },
          ],
        },
      });

      if (user?.Username == req.body.Username)
        //if user is not null, get user.username
        return res.send({ error: "Username Already taken" });
      if (user?.Email == req.body.Email)
        return res.send({ error: "Email Already taken" });

      let createdUser = await UserModel.create(req.body);
      await Balance.bulkCreate([
        {
          UserID: createdUser.ID,
          CurrencyID: 1,
          Balance: parseFloat(req.body.LBP),
        },
        {
          UserID: createdUser.ID,
          CurrencyID: 2,
          Balance: parseFloat(req.body.USD),
        },
      ]);
      return res.send({ data: "Email Registered" });
    } catch (error) {
      console.log(error);
      res.send({ error: "Something went wrong" });
    }
  }

  async login(req, res) {
    // save the data to MYSql if username and email are not taken
    try {
      let user = await UserModel.findOne({
        //get users with username or email
        where: {
          Username: req.body.Username,
          Password: req.body.Password,
        },
        include: {
          // ka2anna find all balances where UserID is the one we got, men wara l has many relation
          model: Balance,
          as: "Balance",
          include: {
            //find one Currency where ID = CurrencyID , men wara l has one (rja3 lal relation ta tchuf kif btemche )
            model: Currency,
            as: "Currency",
          },
        },
        attributes: {
          exclude: ["Password"],
        },
      });

      if (!user)
        //if user is not null, get user.username
        return res.send({ error: "Username or password wrong" });
      return res.send({ data: user });
    } catch (error) {
      console.log(error);
      res.send("Error in DB");
    }
  }

  async exchange(req, res) {
    // save the data to MYSql if username and email are not taken
    try {
      let userBalance = await Balance.findOne({
        //get users with username or email
        where: {
          UserID: req.body.UserID,
          CurrencyID: req.body.FromCurrencyID,
        },
      });

      if (userBalance.Balance < req.body.FromAmount)
        return res.send({ error: "Not enough balance" });
      else {
        await Balance.update(
          {
            Balance: userBalance.Balance - req.body.FromAmount,
          },
          {
            where: {
              ID: userBalance.ID,
            },
          }
        );
        await Balance.increment(
          {
            Balance: +req.body.ToAmount,
          },
          {
            where: {
              UserID: userBalance.UserID,
              CurrencyID: req.body.ToCurrencyID,
            },
          }
        );
      }

      let user = await UserModel.findOne({
        //get users with username or email
        where: {
          ID: req.body.UserID,
        },
        include: {
          model: Balance,
          as: "Balance",
          include: { model: Currency, as: "Currency" },
        },
        attributes: {
          exclude: ["Password"],
        },
      });
      return res.send({ data: user });
    } catch (error) {
      console.log(error);
      res.send("Error in DB");
    }
  }
}

const user = new User();

module.exports = {
  user,
};
