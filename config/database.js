
let database = async () => {
    try {
        await mongoose.connect(
            "mongodb+srv://ishartjahan82:12345@cluster0.pd2artj.mongodb.net/blog_project"
        );
        console.log("Database connect...");
    }catch (error){
        console.log(error);
    }
};
module.exports = database;