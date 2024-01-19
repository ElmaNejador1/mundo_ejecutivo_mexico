import axios from "axios";

const accessToken = "EAALWVEx5uroBOw1hOZBRN8HXVG7yp3osfGanpS6XIfYn3W6KoAyZAVEYJtUdCVhzzzLQ5ADH0DLqsa9FcH1hQcbONndKh8HZA9ca7EE27nVOInGfHliQ4vLfbLDcW2YmzKe1gnwWjksqux9mK00ELD5JPWZBDMHPZA04QRXfkas7KhpfnRavLjcnwriceX6cEIwZDZD"

export const postFacebook = async (message: string, link: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const {data} = await axios.get(`https://graph.facebook.com/v16.0/me/accounts?access_token=${accessToken}`)

      const {access_token} = data.data[0]

      message = message.replaceAll("#", "%23")

      axios.post(`https://graph.facebook.com/v16.0/me/feed?access_token=${access_token}&link=${link}&message=${message}`)
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    } catch (err) {
      reject(err)
    }
  })
}