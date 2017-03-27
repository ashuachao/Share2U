import mongoose from 'mongoose';
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema({
    userName: String,
    firstName: String,
    lastName: String
})
// index
userSchema.index({
    userName: 1
})
// virtual property
userSchema.virtual('userName.full').get(() => {
    return this.firstName + '' + this.lastName;
})
// weather auto set index
userSchema.set('autoIndex', false);
// all model instance method
userSchema.methods.findSimilarTypes = function(cb) {
    return this.model('User').find({
        type: this.type
    }, cb)
}
// 找userNamedengyuaaa
userSchema.methods.findAaa = function(cb) {
    return this.model('User').find({}).where('userName').equal('aaa').exec(cb);
}
// model method
userSchema.statics.findByName = function (name) {
  return this.find({ userName: new RegExp(name, 'i') });
}
userSchema.static.updateNameById = function(id, name, cb) {
    return this.update(
        {_id: id}, 
        {
            $set: {
                userName: name
            }
        },
        cb
    )
}
userSchema.statics.countUser = function(userName) {
    return this.count({userName: userName});
}
// pre save
userSchema.pre('save', (next) => {
    console.log('presave')
    if('invalid' == this.userName) {
        return next(new Error('invalid name'))
    }
    next();
})
const UserModel = mongoose.model('User', userSchema);
export default UserModel;