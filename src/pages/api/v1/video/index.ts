import {NextApiRequest, NextApiResponse} from "next";
import {filtrar_llaves, message, validar_llaves, validate_cookie} from "@/utils/functions";
import {conn} from "@/utils/database";
import {query_insert} from "@/utils/postgres";
import {decodeHTML5, encodeHTML5} from "entities";


const video = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, body} = req

  let response

  switch (method) {
    case "GET":
      try {
        const {category} = req.query

        response = await conn.query(`SELECT v.id, v.url, v.title, v.id_video_type, vt.type
                                     FROM video as v
                                              JOIN video_type as vt on v.id_video_type = vt.id
                                     WHERE v.active = true
                                     ORDER BY v.id DESC;`)

        if (category && response && response.rows.length > 0) {
          response.rows = response.rows.map((video: any) => ({...video, url: decodeHTML5(video.url)}))
        }

        return res.status(200).json(message("Videos consultados", response.rows))
      } catch (e) {
        return res.status(500).json(message("Error, al consultar los videos"))
      }
    case "POST":
      try {
        const {id: id_users} = await validate_cookie(req, "tokenAuth")
        if (id_users) body.id_users = id_users

        const keys_required = ["url", "id_users", "title", "id_video_type"]
        const validation = await validar_llaves(keys_required, body)

        body.url = encodeHTML5(body.url)

        if (!validation.success) return res.status(500).json(message(validation.message))

        const keys_filter = ["url", "id_users", "title", "id_video_type"]
        response = await conn.query(query_insert(await filtrar_llaves(body, keys_filter), "video"))

        return res.status(200).json(message("Video registrado", response.rows[0]))
      } catch (e) {
        return res.status(500).json(message("Error, al registrar el video"))
      }
    default:
      return res.status(400).json(message("Method not allowed"))
  }
}

export default video