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

  // ✅ Set JWT as HTTP-only cookie
  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development", // false for localhost
    sameSite: process.env.NODE_ENV !== "development" ? "none" : "lax", // ✅ allows frontend (5173) ↔ backend (5000)
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
    path: "/", // ensure cookie sent on all routes
  });
  console.log(token);

  return token;
};

export default createToken;
