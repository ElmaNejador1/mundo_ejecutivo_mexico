import {NextApiRequest, NextApiResponse} from "next";
import {filtrar_llaves, message, validar_llaves, validate_cookie} from "@/utils/functions";
import {conn} from "@/utils/database";
import {query_update} from "@/utils/postgres";
import {decodeHTML5, encodeHTML5} from "entities";

const activityVideo = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, body, query} = req
  const {id} = query

  let response

  switch (method) {
    case "GET":
      try {
        response = await conn.query(`SELECT v.id, v.url, v.title, v.id_video_type
                                     FROM video as v
                                     WHERE v.id = '${id}';`)

        if (response.rows.length === 0) return res.status(404).json(message("El video no existe"))

        response.rows[0].url = decodeHTML5(response.rows[0].url)

        return res.status(200).json(message("Videos consultados", response.rows[0]))
      } catch (e) {
        return res.status(500).json(message("Error, al consultar los videos"))
      }
    case "PUT":
      try {
        const {id: id_users} = await validate_cookie(req, "tokenAuth")

        if (id_users) body.id_users = id_users

        const keys_required = ["url", "id_users", "title", "id_video_type"]
        const validation = await validar_llaves(keys_required, body)

        if (!validation.success) return res.status(500).json(message(validation.message))

        body.url = encodeHTML5(body.url)

        const keys_filter = ["url", "id_users", "title", "id_video_type"]
        response = await conn.query(query_update(await filtrar_llaves(body, keys_filter), {id}, "video"))

        if (response.rows.length === 0) return res.status(404).json(message("El video no existe"))

        return res.status(200).json(message("Video actualizado", response.rows[0]))
      } catch (e) {
        return res.status(500).json(message("Error, al actualizar el video"))
      }
    case "DELETE":
      try {
        response = await conn.query(`UPDATE video
                                     SET active = false
                                     WHERE id = '${id}'
                                     RETURNING *;`)

        if (response.rowCount === 0) return res.status(404).json(message("El video no existe"))

        return res.status(200).json(message("Video eliminado", response.rows[0]))
      } catch (e) {
        return res.status(500).json(message("Error, al eliminar el video"))
      }
    default:
      return res.status(400).json(message("Method not allowed"))
  }
}

export default activityVideo