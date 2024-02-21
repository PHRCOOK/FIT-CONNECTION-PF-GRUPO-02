const { Router } = require('express');
const upload = require('../services/multer');

const {getAllMembershipsHandler ,getMembershipByIdHandler, createMembershipHandler, updateMembershipHandler, deleteMembershipHandler} = require('../handlers/membershipHandler');

const membershipsRouter = Router();

membershipsRouter.get('/', getAllMembershipsHandler);
membershipsRouter.get('/:id', getMembershipByIdHandler);
membershipsRouter.post('/', upload.single('image_url'), createMembershipHandler);
membershipsRouter.put('/update/:id', updateMembershipHandler);
membershipsRouter.delete('/delete/:id', deleteMembershipHandler);

module.exports = membershipsRouter;