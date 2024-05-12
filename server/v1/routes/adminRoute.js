const Router = require('express');
const multiparty = require('connect-multiparty');
const { userAuthorization } = require('../middlewares/authMiddleware');

const {
    getResit,
    getAdmins,
    postAdmin,
    getAdminById,
    getEndpoints,
    readInsertCSV,
    getSettingPage,
    readInsertExcel,
    updateAdminById,
    deleteAdminById,
    getadmindashboard,
} = require('../modules/admins/adminController');

const router = Router();
const multipart = multiparty();
router
    .get('/reset', userAuthorization(['admin']), getResit)
    .get('/endpoints', userAuthorization(['admin']), getEndpoints)
    .get('/settings', userAuthorization(['admin']), getSettingPage)
    .get('/admin-dashboard', userAuthorization(['admin']), getadmindashboard)

    .get('/get-admins', userAuthorization(['admin']), getAdmins)
    .post('/post-admins', userAuthorization(['admin']), postAdmin)
    .get('/get-admins/:admin_id', userAuthorization(['admin']), getAdminById)    
    .patch('/update-admins/:admin_id', userAuthorization(['admin']), updateAdminById)
    .delete('/delete-admins/:admin_id', userAuthorization(['admin']), deleteAdminById)

    .post('/read-and-insert-csv-local-file/:filename', userAuthorization(['admin']), multipart, readInsertCSV)
    .post('/read-and-insert-excel-local-file/:filename', userAuthorization(['admin']), multipart, readInsertExcel);

module.exports = router;

