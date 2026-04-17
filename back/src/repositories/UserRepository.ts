import { AppDataSource } from "../config/data-source";
import { User } from "../entities/User";

const UserRepository = AppDataSource.getRepository(User).extend({
    findById: async function(id: number): Promise<User> {
        const user = await this.findOne({
            where: { id },
            relations: ["credential"]
        });

        if (user) return user;
        else throw new Error("Invalid Id");
    },


    checkById: async function (id: number): Promise<Boolean> {
        const user = await this.findById(id)
        return !!user; //doble negacion
    }
})

export default UserRepository;
