import {Timeline} from "react-twitter-widgets";

export const TimelineTwitter = () => {
  return (<>
    <Timeline
      dataSource={{
        sourceType: 'profile',
        screenName: 'MundoE_CDMX',
      }}
      options={{
        username: 'MundoE_CDMX',
        height: '500',
        width: "100%",
      }}
    />
  </>)
}