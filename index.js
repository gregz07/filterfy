/**
 * 
 * @param { startMonth: { value: 7, field: 'month' }, endMonth: { value: '', field: 'month' }, client_id: 3 } filters Filters we want to use in our Sequelize query
 * @param { startMonth: Op.gte, endMonth: Op.lte } operators Object with filters as keys, and their values Sequelize.Op
 */
module.exports = function (filters, operators = {}) {
  let _filters = {}; 
  // Remove undefined filters (Read about short-circuit-evalution) 
  Object.keys(filters).forEach(key => ((filters[key] && filters[key].hasOwnProperty('value') && invalidFilterValue(filters[key].value)) || invalidFilterValue(filters[key])) && delete filters[key]);
  
  // Apply operators in valid filters
  Object.keys(filters).forEach(key => {
      if (operators[key]) {
        if (_filters[filters[key].field || key]) {
          _filters[filters[key].field || key] = Object.assign(
            _filters[filters[key].field || key],
            { [operators[key]]: filters[key].value || filters[key] }
          );
        } else {
          _filters[filters[key].field || key] = { [operators[key]]: filters[key].value || filters[key]};
        }
      } else {
        _filters[filters[key].field || key] = filters[key].value || filters[key];
      }
    }
  );

  return _filters;
}

// Invalid values for filter
function invalidFilterValue(val) {
  return val === undefined || val === null;
}