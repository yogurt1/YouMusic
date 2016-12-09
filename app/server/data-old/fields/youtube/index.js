import {
    GraphQLInt,
    GraphQLString,
    GraphQLObjectType
} from "graphql"
import videoLoader from "./loader"

export const VideoType = new GraphQLObjectType({
    name: "Video",
    fields: {
        img: {type: GraphQLString},
        title: {type: GraphQLString}
        videoId: {type: GraphQLString}
    }
})

export default {
    type: VideoType,
    args: {
        id: {type: GraphQL},
    },
    resolve(root, args) {
        return videoLoader.load(args.id)
    }
}
