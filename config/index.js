const config = {
    PORT:process.env.PORT || 4000,
    mongodb:{
        dsn:'mongodb://localhost:27017/TBS',
        options: {
            dbName: 'TBS',
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
          }
    },
    secret: 'yoursecret'
}

export default config