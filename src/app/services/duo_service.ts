import { Duo } from "../types/duo"
import logger from "@/logger"
import BaseService from "./service"



class DuoService extends BaseService {

    getNextHealthStage(
        level: number, 
        stage: number
    ) {
        const stages_health = [
            300 + 100 * level,
            200 + 100 * level,
            150 + 50 * level,
            100 + 50 * level,
            75 + 25 * level,
            25 + 25 * level
        ]

        let health = 0
        for (let i: number = stage; i < stages_health.length; i++) {
            health += stages_health[i];
        }
        

        return health;
    }

    async getData(owner_id: number) { 
        const res = await fetch(`${this.API_PATCH}duo/${owner_id}`,{
            headers: {...this.headers}
        });    
        if (res.status == 200) {
            const data = await res.json();
            const duo: Duo = data.duo;
            return duo;
        }
        else if (res.status == 404) {
            return null;
        }
    };


    async damageDuo(owner_id: number) {
        const duo: Duo | null | undefined = await this.getData(owner_id);
        
        if (!duo) {
            logger.info("Not duo: " + owner_id);
            return;
        }

        const res = await fetch(`${this.API_PATCH}duo/damage_duo`,{
            method: 'POST',
            body: JSON.stringify({
                owner_id: owner_id
            }),
            headers: {...this.headers}
        })

        logger.info(`Damage duo status: ${res.status}`);

        const new_health = duo.health - 40;
        const health_do_next_stage = this.getNextHealthStage(duo.level, duo.stage);

        if (new_health <= 0) {
            const res = await fetch(`${this.API_PATCH}duo/critical_damage`, {
                method: 'POST',
                body: JSON.stringify({
                    owner_id: owner_id
                }),
                headers: {...this.headers}
            })
            logger.info(`Critical damage duo status: ${res.status}`)
            return 
            
        }

        else if (new_health < health_do_next_stage && duo.stage != 6 ){

            const res = await fetch(`${this.API_PATCH}duo/set_stage`, {
                method: 'POST',
                body: JSON.stringify({
                    owner_id: owner_id,
                    new_stage: duo.stage + 1
                }),
                headers: {...this.headers}
            })
            
            logger.info(`Set stage duo status: ${res.status}`)
        }
    }
}

export default DuoService