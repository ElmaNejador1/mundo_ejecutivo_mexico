import {NextApiRequest, NextApiResponse} from "next";
import {filtrar_llaves, message, validar_llaves} from "@/utils/functions";
import {conn} from "@/utils/database";
import {uploadFile} from "@/utils/s3";
import {query_update} from "@/utils/postgres";

const Tv = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, query, body} = req
  const {id} = query

  let response

  switch (method) {
    case 'GET':
      try {
        response = await conn.query(`SELECT *
                                     FROM tv
                                     WHERE active = true
                                       AND id = ${id};`)

        if (response.rows.length === 0) return res.status(404).json(message("TV no encontrado"))

        return res.status(200).json(message("TV obtenido correctamente", response.rows[0]))
      } catch (e) {
        return res.status(500).json(message("Error, al obtener el tv"))
      }
    case 'PUT':
      try {
        const keys_required = ['title', 'url'];
        const validation = await validar_llaves(keys_required, body);

        if (!validation.success) return res.status(400).json(message(validation.message));

        const {cover, coverName} = body

        delete body.img

        if (cover && coverName && coverName !== "") {
          const result = await uploadFile(cover, `tv-${coverName}`);

          if (!result.success || !result.response) return res.status(500).json(message("Error, al subir la portada"));

          body.img = result.response.url;
        }

        const keys_filter = ['title', 'url', 'img'];

        response = await conn.query(query_update(await filtrar_llaves(body, keys_filter), {id}, "tv"))

        return res.status(200).json(message("TV actualizado correctamente", response.rows[0]))
      } catch (e) {
        return res.status(500).json(message("Error, al actualizar el tv"))
      }
    case 'DELETE':
      try {
        response = await conn.query(`UPDATE tv
                                     SET active = false
                                     WHERE id = '${id}'
                                     RETURNING *;`)

        if (response.rows.length === 0) return res.status(404).json(message("TV no encontrado"))

        return res.status(200).json(message("TV eliminado correctamente", response.rows[0]))
      } catch (e) {
        console.log(e)
        return res.status(500).json(message("Error, al eliminar el tv"))
      }
    default:
      return res.status(400).json(message("Method not allowed"));
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1gb',
    }
  }
}

export default Tv