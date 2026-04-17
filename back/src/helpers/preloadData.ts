import { AppDataSource } from "../config/data-source";
import appointmentsRouter from "../routes/appointmentsRouter";

AppDataSource.manager.transaction( async (transactionalEntityManager) => {

})