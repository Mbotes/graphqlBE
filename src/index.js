const {GraphQLServer} = require('graphql-yoga');


let links  = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for graphql'
}]

let  idCount = links.length

const resolvers = {
    Query: {
        info: () => 'null',
        feed: () => links,
        link: (props) => links[props.id] 
    },
    Mutation: {
        post: (root, args) => {
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url
            }
            links.push(link)
            return link
        },

        updateLink: (root, args) => {
            const link = {
                id: args.id,
                description: args.description,
                url: args.url
            }

            var foundIndex = links.findIndex(x => x.id== link.id)
            links[foundIndex] = link
            return link

        },

        deleteLink: (root, args) => {
            var foundIndex = links.findIndex(x => x.id == args.id)

            if (foundIndex !== -1) {
                links.splice(foundIndex, 1)
            }

            return {data: "delted!"}
        }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers
})

server.start(() => console.log(`Server is running on http://localhost:4000`));