import { Router } from 'express';
import {   
    getAllContacts,
    createNewContact,
    getContactById,
    updateContactById,
    deleteContactById 
} from '../controllers/contactController.js';
import validateTokenHandler from '../middleware/validateTokenHandler.js';

const router = Router();

router.use(validateTokenHandler)
router.route('/').get(getAllContacts).post(createNewContact);

router.route('/:id').get(getContactById).put(updateContactById).delete(deleteContactById);

export default router;