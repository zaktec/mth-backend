const Router = require('express');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getResit,
    getAdmins,
    postAdmin,
    getAdminById,
    getEndpoints,
    updateAdminById,
    getSettingPage,
    deleteAdminById,
    getadmindashboard,
} = require('../modules/admins/adminController');

const router = Router();
router
    .get('/reset', userAuthorization(['admin']), getResit)
    .get('/endpoints', userAuthorization(['admin']), getEndpoints)
    .get('/settings', userAuthorization(['admin']), getSettingPage)
    .get('/admin-dashboard', userAuthorization(['admin']), getadmindashboard)

    .get('/get-admins', userAuthorization(['admin']), getAdmins)
    .post('/post-admins', userAuthorization(['admin']), postAdmin)
    .get('/get-admins/:admin_id', userAuthorization(['admin']), getAdminById)
    .patch('/update-admins/:admin_id', userAuthorization(['admin']), updateAdminById)
    .delete('/delete-admins/:admin_id', userAuthorization(['admin']), deleteAdminById);

module.exports = router;

