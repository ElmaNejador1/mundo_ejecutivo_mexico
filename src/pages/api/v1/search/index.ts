import {NextApiRequest, NextApiResponse} from "next";
import {message, removeAccents} from "@/utils/functions";
import {conn} from "@/utils/database";
import {decodeHTML5} from "entities";

const search = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method, query} = req

  let response: any

  switch (method) {
    case "GET":
      try {
        const {page} = query
        let {search} = query

        if (typeof search !== "string" || search === "") return res.status(500).json(message("Error, el parámetro search es requerido"))
        if (typeof page !== "string" || !parseInt(page)) return res.status(500).json(message("Error, el parámetro page es requerido"))

        search.replace(/<[^>]*>?/gm, '')

        search = removeAccents(search)

        const responseProducts = await conn.query(`SELECT p.*
                                                   FROM (SELECT CEIL(ROW_NUMBER() OVER (ORDER BY p.id DESC) / 19) AS grupo,
                                                                p.*
                                                         FROM posts AS p
                                                                  JOIN categories c ON c.id = p.id_category
                                                         WHERE p.active = true
                                                           AND (LOWER(UNACCENT(p.content)) LIKE LOWER(UNACCENT('%${search}%'))
                                                             OR LOWER(UNACCENT(p.title)) LIKE LOWER(UNACCENT('%${search}%')))) AS p
                                                   WHERE p.grupo = ${parseInt(page) - 1};`)

        if (responseProducts.rows.length > 0) responseProducts.rows.forEach((post: any) => delete post.grupo)

        const responseCount = await conn.query(`SELECT COUNT(p.id) as count
                                                FROM posts AS p
                                                         JOIN categories c on c.id = p.id_category
                                                WHERE p.active = true
                                                  AND (LOWER(UNACCENT(p.content)) LIKE LOWER(UNACCENT('%${search}%'))
                                                    OR LOWER(UNACCENT(p.title)) LIKE LOWER(UNACCENT('%${search}%')));`)

        if (responseProducts.rows.length > 0) responseProducts.rows.forEach((product: any) => product.content = decodeHTML5(product.content).replace(/<[^>]*>?/gm, ''))

        response = {
          product: responseProducts.rows,
          total: Math.ceil(responseCount.rows[0].count / 19),
          currentPage: parseInt(page)
        }

        return res.status(200).json(message("Posts consultados", response))
      } catch (e) {
        console.log(e)
        return res.status(500).json(message("Error al consultar los posts"))
      }
    default:
      return res.status(405).json(message("Error, método no permitido"))
  }
}

export default search