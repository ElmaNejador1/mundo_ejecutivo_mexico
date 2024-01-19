import {message} from "@/utils/functions";
import {NextApiRequest, NextApiResponse} from "next";
import {conn} from "@/utils/database";

const event_type = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req

  let response

  switch (method) {
    case "GET":
      try {
        response = await conn.query(`SELECT id, type
                                     FROM video_type
                                     WHERE active = true;`)

        return res.status(200).json(message("Tipos de videos consultados", response.rows))
      } catch (e) {
        return res.status(500).json(message("Error, al consultar los tipos de videos"))
      }
    default:
      return res.status(400).json(message("Method not allowed"))
  }
}

export default event_type