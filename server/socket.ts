// import {createServer} from "sockjs"
// import * as config from "../config"

// const socket = createServer({sockjs_url: config.app.sockjs_url})
// const ps = new function PubSub() {
//     const channels = new Map() // channel: string => conn: Set<SocketConnection>
//     const middlewares = []
//     const dispatch = action => {
//         const composed = middlewares.reduceRight(
//             (g, f) => f(g), JSON.stringify)
//         const data = composed(action)
//         return conn => {
//             conn.write(data)
//         }
//     }

//     return {
//         use(middleware) {
//             middlewares.push(middleware)
//         },

//         publish(action) {
//             const {channel} = action.meta

//             if (!channels.has(channel)) {
//                 const conns = new Set()
//                 channels.set(channel, conns)
//                 return
//             }

//             const send = dispatch(action)
//             const conns = channels.get(channel)

//             for (const conn of conns) {
//                 send(conn)
//             }
//         },

//         subscribe(channel, conn) {
//             if (Array.isArray(channel)) {
//                 channel.forEach(c => this.subscribe(c, conn))
//                 return
//             }

//             const send = dispatch({
//                 type: "MESSAGE",
//                 payload: {
//                     subscribed: true
//                 },
//                 meta: {

//                 }
//             })
//         },

//         unsubscribe(channel, conn) {
//             if (Array.isArray(channel)) {
//                 channel.forEach(c => this.unsubscribe(c, conn))
//             }

//             if (!channel) {
//                 channel = channels.keys()
//             }

//             for (const c of channel) {
//                 const conns = channels.get(channel)
//                 conns.delete(conn)
//             }
//         }
//     }
// }

// socket.on("connection", conn => {
//     conn.on("data", data => {
//         const action = JSON.parse(data)
//         const {id, channel} = action.meta

//         switch(action.type) {
//             case "PUBLISH": return ps.publish(action)
//             case "SUBSCRIBE": return ps.subscribe(channel, conn)
//             case "UNSUBSCRIBE": return ps.unsubscribe(channel, conn)
//         }
//     })
// })

// export default socket
