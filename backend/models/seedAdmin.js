const mongoose = require('mongoose');
const Admin = require('./adminModel'); // Adjust path as needed
const bcrypt = require('bcrypt');

// Connect to the database
mongoose.connect('mongodb+srv://gavinarori:g123456@cluster0.7kfoiet.mongodb.net/collections', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to the database');
}).catch(err => {
    console.error('Database connection error:', err);
});

// Function to seed an admin user
const seedAdmin = async () => {
    try {
        // Hash the password
        const hashedPassword = await bcrypt.hash('yourPassword123', 10); // Replace with your desired password

        // Create an admin object
        const admin = new Admin({
            name: 'Admin Name',
            email: 'admin@example.com',
            password: hashedPassword,
            image: '', // Replace with actual image path/URL if needed
        });

        // Save the admin to the database
        await admin.save();
        console.log('Admin user created successfully');

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error creating admin user:', error);
        mongoose.connection.close();
    }
};

// Run the seed function
seedAdmin();
