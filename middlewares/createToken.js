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

  // Set JWT as HTTP-only cookie for cross-site usage (production)
res.cookie("jwt", token, {
  httpOnly: true,
  secure: true,       // MUST be true on Render
  sameSite: "none",   // REQUIRED for Vercel <-> Render cookies
  maxAge: 30 * 24 * 60 * 60 * 1000,
  path: "/",
});

  return token;
};

export default createToken;
