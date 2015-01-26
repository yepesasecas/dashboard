var _ = require("underscore");

_new = function(params){
  return {
    id:      params.id,
    status:  params.status,
    partner: params.partner,
  };
};

_random = function(){
  var statuses  = ["n", "p", "v", "c", "q"];
  var orders_id = [1, 2, 3, 4, 5, 6, 7, 8, 9 ,10, 11];
  var partners  = ["overstock"];
  
  return _new({
    id:      _.sample(orders_id), 
    status:  _.sample(statuses), 
    partner: _.sample(partners)
  });
};

exports.new    = _new;
exports.random = _random;