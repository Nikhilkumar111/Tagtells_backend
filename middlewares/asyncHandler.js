// WITH THE HELP OF PROMISES 
const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise.resolve(requestHandler(req, res, next)).catch((err) => next(err));
  };
};
export default asyncHandler;











//WITH THE HELP OF TRY CATCH 
// const asyncHandler = (func)=>async(req,res,next)=>{
// try{
// await func(req,res,next)

// }catch(error){
// res.status(error.code || 500).json({
//      success:false,
//      message:error.message
// })
// }
// }