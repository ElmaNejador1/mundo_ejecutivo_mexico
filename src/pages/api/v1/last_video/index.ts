import {NextApiRequest, NextApiResponse} from "next";
import {filtrar_llaves, message, validar_llaves} from "@/utils/functions";
import {conn} from "@/utils/database";
import {query_insert, query_update} from "@/utils/postgres";
import {decodeHTML5, encodeHTML5} from "entities";

const last_video = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, body, query} = req

  let response

  switch (method) {
    case "GET":
      try {
        const {id_video_type} = query

        if (!id_video_type) return res.status(500).json(message("Error, el id es requerido"))


        response = await conn.query(`SELECT v.*
                                     FROM video v
                                     WHERE v.id_video_type = '${id_video_type}'
                                     ORDER BY v.id DESC
                                     LIMIT 1;`)

        if (response.rows.length > 0) response.rows[0].url = decodeHTML5(response.rows[0].url)

        return res.status(200).json(message("Video consultado", response.rows.length > 0 ? response.rows[0] : {
          url: "",
          title: ""
        }))
      } catch (e) {
        return res.status(500).json(message("Error, al consultar el video"))
      }
    default:
      return res.status(400).json(message("Method not allowed"))
  }
}

export default last_video;