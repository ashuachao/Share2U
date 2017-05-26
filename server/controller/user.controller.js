import UserModel from '../db/models/user.model';
const UserController = {
    async getUsers(ctx, next) {
        const users = await UserModel.find({}).exec();
        ctx.body = users;
    },
    async signInOnce(ctx, next) {
        let newUser;
        if (ctx.session.user) {
            ctx.body = ctx.session.user;
        } else {
            try {
                const user = await UserModel.findByName('tourist');
                if (user.length > 0) {
                    newUser = user[0];
                } else {
                    const tourist = new UserModel({
                        userName: 'tourist'
                    })
                    await tourist.save();
                    newUser = tourist;
                }
                ctx.session.user = newUser;
                ctx.body = newUser;
            } catch (error) {
                throw(error)
            }
        }
    },
    async signOut(ctx, next) {
        if (ctx.session.user) {
            delete ctx.session.user;
            ctx.body = {
                success: true
            }
        } else {
            throw('can not signout again')
        }
    }
}
export default UserController;