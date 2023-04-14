const express = require('express');
const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config()


const app = express();
const port = 3000;

const uri = process.env.MONGO_URI;
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema({
    email: String,
    totalNumberOfItemsPurchased: Number,
    totalAmountSpent: Number
});

const itemSchema = new Schema({
    name: String,
    totalNumberInInventory: Number,
    totalNumberOfPurchases: Number,
    unitPrice: Number
});

const purchaseSchema = new Schema({
    userEmail: String,
    itemId: Schema.Types.ObjectId,
    quantity: Number,
    totalCost: Number
});

const User = mongoose.model('User', userSchema);
const Item = mongoose.model('Item', itemSchema);
const Purchase = mongoose.model('Purchase', purchaseSchema);

app.use(express.json());

app.post('/users', async (req, res) => {
    try {
        const { email, totalNumberOfItemsPurchased, totalAmountSpent } = req.body;

        const newUser = new User({
            email,
            totalNumberOfItemsPurchased,
            totalAmountSpent
        });

        await newUser.save();

        res.send('User added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding the user');
    }
});


app.post('/items', async (req, res) => {
    try {
        const { name, totalNumberInInventory, totalNumberOfPurchases, unitPrice } = req.body;

        const newItem = new Item({
            name,
            totalNumberInInventory,
            totalNumberOfPurchases,
            unitPrice
        });

        await newItem.save();

        res.send('Item added successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while adding the item');
    }
});

app.post('/purchase', async (req, res) => {
    const session = await mongoose.startSession();
    console.log(req.body)

    try {
        await session.withTransaction(async () => {
            const { userEmail, itemId, quantity } = req.body;

            // Get the item details
            const item = await Item.findById(itemId);

            if (!item) {
                res.status(404).send(`Item with id ${itemId} not found`);
                return;
            }

            if (item.totalNumberInInventory < quantity) {
                res.status(400).send(`Not enough stock for item ${item.name}`);
                return;
            }

            // Calculate the total cost
            const totalCost = item.unitPrice * quantity;

            // Update the user's details
            const user = await User.findOneAndUpdate(
                { email: userEmail },
                { $inc: { totalNumberOfItemsPurchased: quantity, totalAmountSpent: totalCost } },
                { session, new: true }
            );

            if (!user) {
                res.status(404).send(`User with email ${userEmail} not found`);
                return;
            }

            // Update the item's details
            await Item.updateOne(
                { _id: itemId },
                { $inc: { totalNumberInInventory: -quantity, totalNumberOfPurchases: quantity } },
                { session }
            );

            // Add the purchase information
            const purchase = new Purchase({
                userEmail,
                itemId,
                quantity,
                totalCost,
            });

            await purchase.save({ session });

            res.send(`Purchase completed successfully. Total cost: ${totalCost}`);
        });

    } catch (error) {
        console.error(error);
        res.status(500).send('An error occurred while processing the transaction');
    } finally {
        session.endSession();
    }
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
