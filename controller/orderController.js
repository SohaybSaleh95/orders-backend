const Order = require("../models/orderModel");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");

const getOrders = async (req, res) => {
    const query = {}
    const { orderBy, transportBy, fromCity, toCity, date, orderType, passengers, type } = req.query

    if (orderBy) {
        query.orderBy = orderBy
    }

    if (transportBy) {
        query.transportBy = transportBy
    }

    if (fromCity) {
        query.fromCity = fromCity
    }

    if (toCity) {
        query.toCity = toCity
    }

    if (date) {
        query.date = date
    }

    if (orderType) {
        query.orderType = orderType
    }

    if (passengers) {
        query.passengers = passengers
    }

    if (type === 'service') {
        query.transportBy = {
            $exists: false
        }
    } else if (type === 'order') {
        query.orderBy = {
            $exists: false
        }
    }

    const orders = await Order.find(query).sort({ createdAt: '-1' }).populate(['orderBy', 'transportBy', 'fromCity', 'toCity'])
    res.json(orders)
}

const createOrder = async (req, res) => {
    try {
        const loggedInUser = await getLoggedInUser(req);
        const orderBody = req.body;
        if (loggedInUser.type === "Transport") {
            orderBody.transportBy = loggedInUser._id
        } else if (loggedInUser.type === 'Customer') {
            orderBody.orderBy = loggedInUser._id;
        }
        const createdOrder = await Order.create(orderBody)

        res.json(createdOrder);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

const updateOrder = async (req, res) => {
    try {
        const loggedInUser = await getLoggedInUser(req);
        const orderBody = req.body;
        if (loggedInUser.type === "Transport") {
            orderBody.transportBy = loggedInUser._id
        } else if (loggedInUser.type === 'Customer') {
            orderBody.orderBy = loggedInUser._id;
        }
        await Order.updateOne({ _id: req.params.id }, { ...orderBody })
        res.json()
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
}

const updateStatus = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id })
        order.status = req.body.status
        res.json(await order.save())
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
}

const getLoggedInUser = async (req) => {
    return await User.findOne({ _id: jwt.verify(req.headers.token, process.env.JWT_SECRET).user });
}

const deleteOrder = async (req, res) => {
    try {
        const order = await Order.findOne({ _id: req.params.id })
        await order.deleteOne()
        res.json()
    } catch (error) {
        console.log(error)
        res.status(500).send()
    }
}

module.exports = {
    getOrders,
    createOrder,
    updateOrder,
    updateStatus,
    deleteOrder
}