const {GraphQLServer} = require('graphql-yoga');
const { Prisma } = require('prisma-binding')


let links  = [{
    id: 'link-0',
    url: 'www.howtographql.com',
    description: 'Fullstack tutorial for graphql'
}]

let  idCount = links.length

const resolvers = {
    Query: {
        info: () => 'null',
        feed: (root, args, context, info) => {
            return context.db.query.links({}, info)
        },
        link: (props) => links[props.id] 
    },
    Mutation: {
       post: (root, args, context, info) => {
           return context.db.Mutation.createLink({
               data: {
                   url: args.url,
                   description: args.description
               }
           }, info)
       }
    }
}

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers,
    context: req => ({
        ...req,
        db: new Prisma({
          typeDefs: 'src/generated/prisma.graphql',
          endpoint: 'https://eu1.prisma.sh/michael-botes-934aac/database/dev',
          secret: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7InNlcnZpY2UiOiJkYXRhYmFzZUBkZXYiLCJyb2xlcyI6WyJhZG1pbiJdfSwiaWF0IjoxNTQ0NDQ1MjU3LCJleHAiOjE1NDUwNTAwNTd9.pXa9UczmsVzrd7f8Q93IS0-h7_222ySqQLaOIiZDQww',
          debug: true,
        }),
      }),
})

server.start(() => console.log(`Server is running on http://localhost:4000`));