const City = require("../models/cityModel");

const getCities = async (req, res) => {
    const cities = await City.find()
    res.json(cities)
}

const getCity = async (req, res) => {
    try {
        const city = await City.findOne({ _id: req.params.id })
        if (!city) {
            res.status(404).send("City wasn't found")
            return
        }

        res.json(city)
    } catch (err) {
        console.log(err)
        res.status(500).send()
    }
}

const createCity = async (req, res) => {
    try {
        const { name, enabled } = req.body
        const createdCity = await City.create({
            name: name,
            enabled: enabled
        })

        res.json(createdCity);

    } catch (err) {
        console.error(err);
        res.status(500).send();
    }
}

const updateCity = async (req, res) => {
    try {
        const { name, enabled } = req.body
        const city = await City.findOne({ _id: req.params.id })
        if (!city) {
            res.status(404).send("City wasn't found")
            return
        }
        city.name = name
        city.enabled = enabled
        await city.save()

        res.json(city)
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
}

const deleteCity = async (req, res) => {
    try {
        const city = await City.findOne({ _id: req.params.id })
        if (!city) {
            res.status(404).send("City wasn't found")
            return
        }

        await city.remove()

        res.json()
    } catch (err) {
        console.log(err)
        res.status(500).send();
    }
}

module.exports = {
    getCities,
    getCity,
    createCity,
    updateCity,
    deleteCity
}