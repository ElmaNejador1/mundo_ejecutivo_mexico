import {TwitterApi} from 'twitter-api-v2';

const twitterClient = new TwitterApi({
  appKey: "hcHz67fGMJKpm5hm3a2vx4bR9",
  appSecret: "Bat0JEHLDDXV1elfPGiqTpzzPJML8dsT0TKi5iUX8vWted7EX3",
  accessToken: "1703916491480109056-3MY2fDkphcAbqcg8TQxIEvHOS1eUOd",
  accessSecret: "dXfBcw3QWMOKHkOACqBq36yxwohSPqNYKWpOmiOxl8eGr",
})

export const postTwitter = async (message: string, link:string) => {
  new Promise(async (resolve, reject) => {
    try {
      await twitterClient.v2.tweet(`${message} \n\n\n${link}`)
    } catch (err) {
      reject(err)
    }
  })
}