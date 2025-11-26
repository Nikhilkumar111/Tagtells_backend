// import jwt from "jsonwebtoken"
// const genrateToken = (res,userId)=>{
//      //THIS IS THE ECOMMERCE WEBSITE THEN THIS WILL PERFORM
//      // GENNUALY 
//      const token = jwt.sign({userId},process.env.JWT_SECRET,{
//       expiresIn: "30d",
//   });

// //SET JWT as an HTTP-Only Cookie
// res.cookie("jwt",token,{
//      httpOnly:true,
//      secure:process.env.NODE_ENV !== "development",
//      sameSite:"strict",
//      maxAge:30*24*60*60*1000,
// });
// return token;

// }
// export default genrateToken;


import jwt from "jsonwebtoken";

const createToken = (res, userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  // Set JWT as HTTP-only cookie for cross-site usage
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production", // true in prod (HTTPS), false in dev
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax", // none for cross-site in prod, lax for dev
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/",
  });

  return token;
};

export default createToken;
