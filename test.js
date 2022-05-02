const request = require("./utils/util.js").request;
const createTeam = (field_id,type,typeinfo,goal,name,description,rule)=>{
  var data = {
    field_id:field_id, // int
    type: type,  // int
    typeinfo: typeinfo,
    goal: goal,
    name: name,
    description: description,
    rule: rule
  }
  request('/team/new','POST',data).then(
    (res)=>{
      console.log(res.data.data);
    },
    ()=>{}
  )
}
const createFastRecruit = (team_id,is_local,count,requirement)=>{
  var data = {
    team_id: team_id,
    is_local: is_local,
    count: count,
    requirement: requirement
  };
  request('/recruit/leader/createFast','POST',data).then(
    (res)=>{
      console.log(res.data.data);
    },
    ()=>{}
  )
}

module.exports = {
  createTeam,
  createFastRecruit
}