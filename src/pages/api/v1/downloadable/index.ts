import {NextApiRequest, NextApiResponse} from "next";
import {filtrar_llaves, message, validar_llaves} from "@/utils/functions";
import {conn} from "@/utils/database";
import {uploadFile} from "@/utils/s3";
import {query_insert} from "@/utils/postgres";

const News = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, query, body} = req

  let response

  switch (method) {
    case 'GET':
      try {
        const {home} = query

        response = await conn.query(`SELECT *
                                     FROM downloadable
                                     WHERE active = true
                                     ORDER BY id DESC
                                         ${home && home === 'true' ? 'LIMIT 3' : ''};`)

        return res.status(200).json(message("Descargable obtenido correctamente", response.rows))
      } catch (e) {
        return res.status(500).json(message("Error, al obtener el descargable"))
      }
    case 'POST':
      try {
        const keys_required = ['date', 'cover', 'coverName', 'url', 'title'];
        const validation = await validar_llaves(keys_required, body);

        if (!validation.success) return res.status(400).json(message(validation.message));

        const {cover, coverName} = body

        if (cover && coverName && coverName !== "") {
          const result = await uploadFile(cover, `portada-${coverName}`);

          if (!result.success || !result.response) return res.status(500).json(message("Error, al subir la portada"));

          body.cover_url = result.response.url;
        } else {
          delete body.cover_url;
        }

        const keys_filter = ['date', 'cover_url', 'url', 'title'];

        response = await conn.query(query_insert(await filtrar_llaves(body, keys_filter), "downloadable"))

        return res.status(200).json(message("Descargable registrado correctamente", response.rows[0]))
      } catch (e) {
        return res.status(500).json(message("Error, al registrar el descargable"))
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

export default News