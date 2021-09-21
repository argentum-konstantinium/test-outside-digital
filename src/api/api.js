const axios = require('axios')

export default {
    async addTaxDeduction(data) {
        return (await axios.post('/addTaxDeductions',data)).data
    }
}