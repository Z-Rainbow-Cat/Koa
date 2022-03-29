import axios from "axios"
class ajax {
    get(url,params){
        axios.get(url,{params})
    }
}