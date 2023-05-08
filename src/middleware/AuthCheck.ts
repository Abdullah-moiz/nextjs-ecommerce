import jwt, { JwtPayload } from "jsonwebtoken";


export const dynamic  = 'force-dynamic'

const AuthCheck = async (req: Request) => {
    const token = req.headers.get("Authorization")?.split(" ")[1];
    if (!token) {
      return false;
    }
    try {
      const decoded = await jwt.verify(token, process.env.JWT_SECREAT ?? 'default_secret_dumbScret') as JwtPayload;
      if(decoded) return decoded?.role
    } catch (error) {
      return false
    }
  }
  


export default AuthCheck;