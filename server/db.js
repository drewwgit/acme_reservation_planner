const pg = require("pg");

const client = new pg.Client('postgres://localhost/acme_reservation_planner');

// fetchAll -  customers, restaurants and reservations  
const fetchAllCustomers = async ()=>{
    const response = await client.query(`SELECT * FROM customers ORDER BY id ASC`);
    return response.rows; 
};

const fetchAllRestaurants = async ()=> {
    const response = await client.query(`SELECT * FROM restaurants ORDER BY id ASC`)
    return response.rows; 
};

const fetchAllReservations = async ()=> {
    const response = await client.query(`SELECT * FROM reservations ORDER BY id ASC`);
    return response.rows; 
};

// get single customer and customer reservations  

const getSingleCustomer = async (id) => {
    const response = await client.query(`SELECT * FROM customers WHERE id = $1`, [id]);
    return response.rows[0];
  }; 

  const getSingleRestaurant = async (id) => {
    const response = await client.query(`SELECT * FROM restaurants WHERE id = $1`, [id]);
    return response.rows[0];
  }; 

const getReservationByCustomerId = async (params_id) => {
    const response = await client.query(`SELECT * FROM customers WHERE id = $1`, [params_id,]);

      const { id, name } = response.rows[0];
      const res_response = await client.query(
        `SELECT * FROM reservations WHERE customer_id = $1`,
        [params_id]
      );
      return {
        id,
        name,
        reservation: res_response.rows,
      };
    };


// create and delete reservations 

const createReservation = async (body) => {
    await client.query(`INSERT INTO reservations(date, party_count, restaurant_id, customer_id) VALUES(now(), $1, $2, $3)`,
      [body.party_count, body.restaurant_id, body.customer_id]
    );

    return {
      party_count: body.party_count,
      restaurant_id: body.restaurant_id,
      customer_id: body.customer_id,
    };
  };

const deleteReservation = async (id) => {
    await client.query(`DELETE from reservations WHERE id = $1`, [Number(id)]);
    return {
      id: id,
    };
  };

module.exports = {
    fetchAllCustomers,
    fetchAllRestaurants,
    fetchAllReservations,


    createReservation, 
    deleteReservation, 
    getReservationByCustomerId,

    getSingleCustomer,
    getSingleRestaurant, 


    client,
};
