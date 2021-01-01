# filterfy
Helper function for a better experience in your Sequelize queries

    const filterfy = require('filterfy');
    const sequelize = require('sequelize');
    
    let query = filterfy(
      {
        client_id: req.query.client_id, 
        startDate: { value: req.query.startDate, field: 'created_on_date' },
        endDate: { value: req.query.endDate, field: 'created_on_date' },
        department_id: undefined // Gets ignored
      },
      {
        startDate: Op.gte,
        endDate: Op.lte
      }
    );
    
    await sequelize.query(sql, { query });
