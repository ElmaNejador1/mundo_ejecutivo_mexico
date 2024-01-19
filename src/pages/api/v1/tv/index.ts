import {NextApiRequest, NextApiResponse} from "next";
import {filtrar_llaves, message, validar_llaves} from "@/utils/functions";
import {conn} from "@/utils/database";
import {uploadFile} from "@/utils/s3";
import {query_insert} from "@/utils/postgres";

const TV = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, query, body} = req

  let response

  switch (method) {
    case 'GET':
      try {
        const {home} = query

        response = await conn.query(`SELECT *
                                     FROM tv
                                     WHERE active = true
                                     ORDER BY id DESC
                                         ${home && home === 'true' ? 'LIMIT 5' : ''};`)

        return res.status(200).json(message("TV obtenidos correctamente", response.rows))
      } catch (e) {
        return res.status(500).json(message("Error, al obtener el tv"))
      }
    case 'POST':
      try {
        const keys_required = ['title', 'url', "cover", 'coverName'];
        const validation = await validar_llaves(keys_required, body);

        if (!validation.success) return res.status(400).json(message(validation.message));

        const {cover, coverName} = body

        if (cover && coverName && coverName !== "") {
          const result = await uploadFile(cover, `tv-${coverName}`);

          if (!result.success || !result.response) return res.status(500).json(message("Error, al subir la portada"));

          body.img = result.response.url;
        } else {
          delete body.img;
        }

        const keys_filter = ['title', 'url', 'img'];

        response = await conn.query(query_insert(await filtrar_llaves(body, keys_filter), "tv"))

        return res.status(200).json(message("TV registrado correctamente", response.rows[0]))
      } catch (e) {
        return res.status(500).json(message("Error, al registrar el TV"))
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

export default TV