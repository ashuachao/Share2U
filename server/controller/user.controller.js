import UserModel from '../db/models/user.model';
const UserController = {
    async getUsers(ctx, next) {
        const users = await UserModel.find({}).exec();
        ctx.body = users;
    },
    async signInOnce(ctx, next) {
        const tourist = new UserModel({
            userName: 'tourist'
        })
        try {
            await tourist.save();
            ctx.body = tourist;
        } catch (error) {
            throw(error)
        }

    }
}
export default UserController;