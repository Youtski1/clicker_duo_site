import BaseService from "./service"

class ValidateService extends BaseService {

    async createUserData(initData: string) {

        const res = await fetch(`${this.API_PATCH}validate/register_data`,{
            method: "POST",
            body: JSON.stringify({"initData": initData}),
            headers: {...this.headers}
        })

        return res
    }

    async getUserData(telegram_id: number): Promise<string | undefined> { 
        const res = await fetch(`${this.API_PATCH}validate/${telegram_id}`,{
            headers: {...this.headers}
        })

        if (res.status == 404){
            return
        }

        const data = await res.json()
        return data.initData
    }
}
export default ValidateService