const {buildSchema} = require('graphql');

module.exports = buildSchema(`
type Booking{
    _id: ID!
    event: Event!
    user: User!
    createdAt: String!
    updatedAt: String!
}

type Event {
    _id: ID!
    title: String!
    description: String!
    place: String!
    price: Float!
    date: String!
    imageUrl: String!
    creator: User!
}

type User{
    _id: ID!
    name: String!
    email: String!
    password: String
    createdEvents: [Event!]
}

type AuthData{
    userId: ID!
    token: String!
    tokenExpiration: Int!
}

input EventInput {
    title: String!
    description: String!
    place: String!
    price: Float!
    date: String!
    imageUrl: String!
}

input UserInput{
    name: String!
    email: String!
    password: String!
}

input EventUpdateInput {
    title: String
    description: String
    place: String
    price: Float
    date: String
    imageUrl: String
}

input UserUpdateInput {
    name: String
    email: String
    password: String
}

type RootQuery {
    events: [Event!]!
    bookings: [Booking!]!
    login(name: String, email: String!, password: String!): AuthData!
}

type RootMutation {
    createEvent(eventInput: EventInput): Event
    updateEvent(eventId: ID!,eventUpdateInput: EventUpdateInput): Event
    deleteEvent(eventId: ID!): Event

    createUser(userInput: UserInput): User
    updateUser(userId: ID!,userUpdateInput: UserUpdateInput): User
    deleteUser(userId: ID!): User

    bookEvent(eventId: ID!): Booking!
    cancelBooking(bookingId: ID!): Event!
}

schema {
    query: RootQuery
    mutation: RootMutation
}
`)