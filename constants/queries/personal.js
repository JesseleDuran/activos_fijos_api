const LIST_PERSONAL = `SELECT * FROM sno_personal`;

function listPersonal(params) {
    let paramsFiltered = '';
    if(params.query) {
        paramsFiltered = buildWhere(params.query);
    }
    return `${LIST_PERSONAL} ${paramsFiltered}`;
}

function buildWhere(value) {
    return ` WHERE cedper ILIKE '%${value}%' OR nomper ILIKE '%${value}%' OR apeper ILIKE '%${value}%'`;
}

module.exports = {
    listPersonal
};