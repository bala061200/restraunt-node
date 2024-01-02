const router = require("express").Router();

const { PrismaClient } = require("@prisma/client");

const prisma1 = new PrismaClient();
// const prisma2 = new PrismaClient1();

router.get("/real", async (req, res) => {
  try {
   console.log("entrt try")

   const user = await prisma1.user.create({
    data:{
        firstname: 'Balakrishnan',
        lastname: 'Anbu',
        email: 'balakrishann3377@gmail.com',
      },
    
  });

    res.send(user);
  } catch (err) {
    console.log("errorrrrr",err)
    res.status(400).json({msg:"Error at catch"});
  }
});

module.exports = router;