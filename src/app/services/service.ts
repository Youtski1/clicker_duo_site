import { API_KEY, API_PATCH } from "@/config";

class BaseService {
    API_PATCH = API_PATCH
    API_KEY = API_KEY

    headers = {
        'api-key': this.API_KEY,
        "Content-Type": "application/json"
    }
}

export default BaseService