import {NextApiRequest, NextApiResponse} from "next";
import {conn} from "@/utils/database";
import {message} from "@/utils/functions";

const Home = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;

  let response: any = {};

  switch (method) {
    case "GET":
      try {
        const consultaResponse = [
          {
            name: "mundoPolitico",
            categories: [1],
            limit: 12
          },
          {
            name: "mujerEjecutiva",
            categories: [2],
            limit: 12
          },
          {
            name: "mundoEmpresarial",
            categories: [8],
            limit: 12
          }
        ]

        for (let i = 0; i < consultaResponse.length; i++) {
          const {name, categories, limit} = consultaResponse[i];
          let where = ""
          categories.forEach((category, index) => where += ` c.id = ${category} OR c.father = ${category} ${index < categories.length - 1 ? "OR" : ""} `)

          const categoryResponse = await conn.query(`SELECT p.id,
                                                            p.title,
                                                            p.img,
                                                            c.url  as category,
                                                            c.name as category_name
                                                     FROM posts p
                                                              JOIN categories c on p.id_category = c.id
                                                     WHERE p.active = true
                                                       AND p.id_post_type = 1
                                                       AND (${where})
                                                     ORDER BY p.id DESC
                                                         LIMIT ${limit};`)

          response[name] = categoryResponse.rows
        }


        // const pinedNoteResponse = await conn.query(`SELECT p.id,
        //                                                     p.title,
        //                                                     p.img,
        //                                                     c.url  as category,
        //                                                     c.name as category_name
        //                                              FROM posts p
        //                                                       JOIN categories c on p.id_category = c.id
        //                                              WHERE p.active = true
        //                                                AND p.id = 191
        //                                              ORDER BY p.visits;`)

        const mostReadResponse = await conn.query(`SELECT p.id,
                                                          p.title,
                                                          p.img,
                                                          c.url  as category,
                                                          c.name as category_name
                                                   FROM posts p
                                                            JOIN categories c on p.id_category = c.id
                                                   WHERE p.active = true
                                                   ORDER BY p.id DESC LIMIT 17;`)

        let notes = [
          // ...pinedNoteResponse.rows,
          ...mostReadResponse.rows
        ]

        response.mostRead = notes.slice(0, 5)
        response.lastNews = notes.slice(5, 17)

        return res.status(200).json(message("Home consultado", response));
      } catch (e) {
        return res.status(500).json(message("Error, al consultar el home"));
      }
    default:
      return res.status(400).json(message("Method not allowed"));
  }
}

export default Home;