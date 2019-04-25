import { Router } from 'express'
import testCtrl from '../../controller/v1/test'

const apiTest = Router();

apiTest.get("/", testCtrl.get);
export default apiTest;