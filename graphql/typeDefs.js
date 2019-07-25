const typeDefs = `
    type Sushant
    {
        id:ID!
        name: String!
        email:String
        password:String
    }
    type Query
    {
         me : [Sushant]!,
         find(id:Int):Sushant!
    }
    type Mutation
    {
       createUser(name:String!,email:String!,password:String!):Sushant!
    }
`;

module.exports = typeDefs;
