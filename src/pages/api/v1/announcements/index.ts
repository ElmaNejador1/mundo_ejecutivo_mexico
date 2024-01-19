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
            name: "opinion",
            categories: [6],
            limit: 5
          },
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

        const mostReadResponse = await conn.query(`SELECT p.id,
                                                          p.title,
                                                          p.img,
                                                          c.url  as category,
                                                          c.name as category_name
                                                   FROM posts p
                                                            JOIN categories c on p.id_category = c.id
                                                   WHERE p.active = true
                                                   ORDER BY p.visits
                                                   LIMIT 23;`)

        response.mostRead = mostReadResponse.rows.slice(17, 23)


        return res.status(200).json(message("Announcements consultado", response));
      } catch (e) {
        return res.status(500).json(message("Error, al consultar los announcements"));
      }
    default:
      return res.status(400).json(message("Method not allowed"));
  }
}

export default Home;