import Router from 'koa-router';
import UserController from '../controller/user.controller';
const router = new Router({
    prefix: '/user'
});
router.get('/getUsers', UserController.getUsers)
router.get('/signInOnce', UserController.signInOnce)
router.get('/signOut', UserController.signOut)
export default router;