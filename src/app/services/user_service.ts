import BaseService from "./service";
import logger from "@/logger";

class UserService extends BaseService {

    async getTopUsersLevel() {
        const res = await fetch(`${this.API_PATCH}user/get_top_users`, {
            headers: {...this.headers}
        });
        
        if (res.status == 200) {
            logger.info(`Successfully get top_users: status ${res.status}`);
            const data = await res.json();
            return data.top_users;
        }
        else {
            logger.info(`Not found top_users: status ${res.status}`);
            return ;
        }
    };
};

export default UserService;